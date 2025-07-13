/*
  # Attendance Tracking System Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, manually assigned)
      - `email` (text, unique, not null)
      - `first_name` (text, not null)
      - `last_name` (text, not null)
      - `phone` (text, not null)
      - `created_at` (timestamptz, not null)
      - `updated_at` (timestamptz, not null)
    
    - `checkin`
      - `id` (uuid, primary key)
      - `user_id` (foreign key to users, not null)
      - `day` (date, not null)
      - `checkin_time` (timestamptz, not null)
      - `notification_status` (enum: not_sent, sent, failed, not null)
    
    - `checkout`
      - `id` (uuid, primary key)
      - `user_id` (foreign key to users, not null)
      - `day` (date, not null)
      - `checkout_time` (timestamptz, not null)
      - `notification_status` (enum: not_sent, sent, failed, not null)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for reading user data for attendance tracking

  3. Enums
    - notification_status_enum (not_sent, sent, failed)
*/

-- Create notification status enum
CREATE TYPE notification_status_enum AS ENUM ('not_sent', 'sent', 'failed');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(20) PRIMARY KEY,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create checkin table
CREATE TABLE IF NOT EXISTS checkin (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  day date DEFAULT CURRENT_DATE NOT NULL,
  checkin_time timestamptz DEFAULT now() NOT NULL,
  notification_status notification_status_enum DEFAULT 'not_sent' NOT NULL
);

-- Create checkout table
CREATE TABLE IF NOT EXISTS checkout (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(20) REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  day date DEFAULT CURRENT_DATE NOT NULL,
  checkout_time timestamptz DEFAULT now() NOT NULL,
  notification_status notification_status_enum DEFAULT 'not_sent' NOT NULL
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkout ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING ((auth.uid())::text = id);

CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid())::text = id);

-- Create policies for checkin table
CREATE POLICY "Users can read all checkin data"
  ON checkin
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own checkin data"
  ON checkin
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Users can update their own checkin data"
  ON checkin
  FOR UPDATE
  TO authenticated
  USING ((auth.uid())::text = user_id);

-- Create policies for checkout table
CREATE POLICY "Users can read all checkout data"
  ON checkout
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own checkout data"
  ON checkout
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.uid())::text = user_id);

CREATE POLICY "Users can update their own checkout data"
  ON checkout
  FOR UPDATE
  TO authenticated
  USING ((auth.uid())::text = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS checkin_user_id_day_idx ON checkin(user_id, day);
CREATE INDEX IF NOT EXISTS checkout_user_id_day_idx ON checkout(user_id, day);
CREATE INDEX IF NOT EXISTS checkin_day_idx ON checkin(day);
CREATE INDEX IF NOT EXISTS checkout_day_idx ON checkout(day);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();