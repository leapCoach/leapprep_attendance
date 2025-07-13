SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '8190eba3-fabe-4b41-be6a-9097e6184879', '{"action":"user_confirmation_requested","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-13 19:13:58.679427+00', ''),
	('00000000-0000-0000-0000-000000000000', '817915a9-bc1c-4577-b33a-832a4e596cca', '{"action":"user_signedup","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"team"}', '2025-07-13 19:14:28.419398+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be8e83db-44f8-4810-83fb-12baa8d021f5', '{"action":"login","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 19:14:58.451469+00', ''),
	('00000000-0000-0000-0000-000000000000', '3250041c-5e75-4931-9779-4d29b398aadf', '{"action":"login","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 20:01:21.563771+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b048e103-1caa-4e18-b528-17cdbeb2de6b', '{"action":"login","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 20:03:38.668855+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eca8f9a9-3d00-402b-bdb4-012da8848b62', '{"action":"token_refreshed","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"token"}', '2025-07-13 21:02:02.390685+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a816afb8-14ee-4e71-9eec-175627d3bbc1', '{"action":"token_revoked","actor_id":"f3b3860f-94e5-48d9-bc6b-85d3459507fe","actor_username":"sxw207@nyu.edu","actor_via_sso":false,"log_type":"token"}', '2025-07-13 21:02:02.393795+00', ''),
	('00000000-0000-0000-0000-000000000000', '99293088-fcd3-452f-a1a7-35f8c7abfed6', '{"action":"user_confirmation_requested","actor_id":"7434d891-6b17-4351-9411-fe2e10cf1406","actor_username":"leapeducation123@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-07-13 21:07:22.353347+00', ''),
	('00000000-0000-0000-0000-000000000000', '12e8fcac-a565-4106-a20c-e4d460a50f9d', '{"action":"user_signedup","actor_id":"7434d891-6b17-4351-9411-fe2e10cf1406","actor_username":"leapeducation123@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-07-13 21:07:41.198547+00', ''),
	('00000000-0000-0000-0000-000000000000', '0cd934c8-e77b-408b-976a-3514f44d1de8', '{"action":"login","actor_id":"7434d891-6b17-4351-9411-fe2e10cf1406","actor_username":"leapeducation123@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 21:07:53.555233+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '7434d891-6b17-4351-9411-fe2e10cf1406', 'authenticated', 'authenticated', 'leapeducation123@gmail.com', '$2a$10$MCRkWuZcui0FkmWr/bB1AeT7NDh3fKLd1Roqn6cNfvvWLrMDuNt92', '2025-07-13 21:07:41.199232+00', NULL, '', '2025-07-13 21:07:22.354675+00', '', NULL, '', '', NULL, '2025-07-13 21:07:53.555929+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "7434d891-6b17-4351-9411-fe2e10cf1406", "email": "leapeducation123@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-07-13 21:07:22.334237+00', '2025-07-13 21:07:53.557774+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', 'authenticated', 'authenticated', 'sxw207@nyu.edu', '$2a$10$7PPUHoeJVEc/T/C.E9nf9eZ0xsCB45u62/jaL5zjejoPz7l7e9wOu', '2025-07-13 19:14:28.420091+00', NULL, '', '2025-07-13 19:13:58.680242+00', '', NULL, '', '', NULL, '2025-07-13 20:03:38.66994+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f3b3860f-94e5-48d9-bc6b-85d3459507fe", "email": "sxw207@nyu.edu", "email_verified": true, "phone_verified": false}', NULL, '2025-07-13 19:13:58.665459+00', '2025-07-13 21:02:02.399679+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('f3b3860f-94e5-48d9-bc6b-85d3459507fe', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', '{"sub": "f3b3860f-94e5-48d9-bc6b-85d3459507fe", "email": "sxw207@nyu.edu", "email_verified": true, "phone_verified": false}', 'email', '2025-07-13 19:13:58.675253+00', '2025-07-13 19:13:58.675303+00', '2025-07-13 19:13:58.675303+00', '9a4339de-6571-42b1-99f5-d76dae30a88e'),
	('7434d891-6b17-4351-9411-fe2e10cf1406', '7434d891-6b17-4351-9411-fe2e10cf1406', '{"sub": "7434d891-6b17-4351-9411-fe2e10cf1406", "email": "leapeducation123@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-07-13 21:07:22.347446+00', '2025-07-13 21:07:22.347501+00', '2025-07-13 21:07:22.347501+00', 'd5eb37be-17ef-464f-9067-b769686bbafe');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('d300809f-96e9-4fb1-a25e-4e19ae0f5df5', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', '2025-07-13 19:14:28.425098+00', '2025-07-13 19:14:28.425098+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', '100.25.195.248', NULL),
	('2f76a85e-6484-477d-98b0-78c04b33bf88', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', '2025-07-13 19:14:58.453169+00', '2025-07-13 19:14:58.453169+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '68.132.235.2', NULL),
	('384eacb2-c043-4a11-8594-0d0d40e9f8d6', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', '2025-07-13 20:01:21.570161+00', '2025-07-13 20:01:21.570161+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '68.132.235.2', NULL),
	('428cbe8e-cd44-4983-8450-12da6dca0a17', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', '2025-07-13 20:03:38.670025+00', '2025-07-13 21:02:02.404337+00', NULL, 'aal1', NULL, '2025-07-13 21:02:02.404247', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '68.132.235.2', NULL),
	('dc0f8d7d-739e-48a5-9cfd-98fca1d71b05', '7434d891-6b17-4351-9411-fe2e10cf1406', '2025-07-13 21:07:41.203653+00', '2025-07-13 21:07:41.203653+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '68.132.235.2', NULL),
	('56cac929-0b65-40c7-b589-3bc21e8ce53f', '7434d891-6b17-4351-9411-fe2e10cf1406', '2025-07-13 21:07:53.556007+00', '2025-07-13 21:07:53.556007+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '68.132.235.2', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('d300809f-96e9-4fb1-a25e-4e19ae0f5df5', '2025-07-13 19:14:28.435515+00', '2025-07-13 19:14:28.435515+00', 'otp', '4218601c-ad53-4a16-86e8-2a7c62c3ab7a'),
	('2f76a85e-6484-477d-98b0-78c04b33bf88', '2025-07-13 19:14:58.455047+00', '2025-07-13 19:14:58.455047+00', 'password', 'ca6fea2d-0cf4-4984-84b3-af78c4755360'),
	('384eacb2-c043-4a11-8594-0d0d40e9f8d6', '2025-07-13 20:01:21.576012+00', '2025-07-13 20:01:21.576012+00', 'password', 'a82c660b-cd4b-4c5f-b336-b7bb3fdb851f'),
	('428cbe8e-cd44-4983-8450-12da6dca0a17', '2025-07-13 20:03:38.673393+00', '2025-07-13 20:03:38.673393+00', 'password', '921ee254-7c10-4a4d-a614-0c0a6eac419c'),
	('dc0f8d7d-739e-48a5-9cfd-98fca1d71b05', '2025-07-13 21:07:41.206715+00', '2025-07-13 21:07:41.206715+00', 'otp', '6427a6b5-abcc-4be9-be70-4d6521c4c119'),
	('56cac929-0b65-40c7-b589-3bc21e8ce53f', '2025-07-13 21:07:53.558093+00', '2025-07-13 21:07:53.558093+00', 'password', '67a5ffd0-4e88-413d-b95e-942f0fc72799');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 2, 'jmfdtsthafk6', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', false, '2025-07-13 19:14:28.429103+00', '2025-07-13 19:14:28.429103+00', NULL, 'd300809f-96e9-4fb1-a25e-4e19ae0f5df5'),
	('00000000-0000-0000-0000-000000000000', 3, 'pew4mtqarmh2', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', false, '2025-07-13 19:14:58.453873+00', '2025-07-13 19:14:58.453873+00', NULL, '2f76a85e-6484-477d-98b0-78c04b33bf88'),
	('00000000-0000-0000-0000-000000000000', 4, 'kgbsgtnzy6cp', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', false, '2025-07-13 20:01:21.573243+00', '2025-07-13 20:01:21.573243+00', NULL, '384eacb2-c043-4a11-8594-0d0d40e9f8d6'),
	('00000000-0000-0000-0000-000000000000', 5, 'wcs7yde7s6jp', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', true, '2025-07-13 20:03:38.671248+00', '2025-07-13 21:02:02.394497+00', NULL, '428cbe8e-cd44-4983-8450-12da6dca0a17'),
	('00000000-0000-0000-0000-000000000000', 6, 'ufxb4ihk4uzj', 'f3b3860f-94e5-48d9-bc6b-85d3459507fe', false, '2025-07-13 21:02:02.397795+00', '2025-07-13 21:02:02.397795+00', 'wcs7yde7s6jp', '428cbe8e-cd44-4983-8450-12da6dca0a17'),
	('00000000-0000-0000-0000-000000000000', 7, 'rhvsb4xpvnm4', '7434d891-6b17-4351-9411-fe2e10cf1406', false, '2025-07-13 21:07:41.204818+00', '2025-07-13 21:07:41.204818+00', NULL, 'dc0f8d7d-739e-48a5-9cfd-98fca1d71b05'),
	('00000000-0000-0000-0000-000000000000', 8, 'ri7tpris43b3', '7434d891-6b17-4351-9411-fe2e10cf1406', false, '2025-07-13 21:07:53.556842+00', '2025-07-13 21:07:53.556842+00', NULL, '56cac929-0b65-40c7-b589-3bc21e8ce53f');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "email", "first_name", "last_name", "phone", "created_at", "updated_at") VALUES
	('4D 05 4A 72', 'shixin.wu9876eric@gmail.com', 'student3', 'leap', '123', '2025-07-13 19:12:18.133301+00', '2025-07-13 19:48:20.220386+00'),
	('8D 67 2B 72', 'shixin.wu9876eric+2@gmail.com
', 'student1', 'leap', '123', '2025-07-13 19:11:08.78579+00', '2025-07-13 19:48:32.186363+00'),
	('ED BF 34 72', 'shixin.wu9876eric+3@gmail.com
', 'student4', 'leap', '123', '2025-07-13 19:13:12.158076+00', '2025-07-13 19:48:36.096476+00'),
	('6D 5E 34 72', 'leapeducation123@gmail.com', 'student2', 'leap', '123', '2025-07-13 19:11:46.193031+00', '2025-07-13 21:11:22.443+00');


--
-- Data for Name: checkin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."checkin" ("id", "user_id", "day", "checkin_time", "notification_status") VALUES
	('619c0f2b-a74c-4136-9def-55098c1c38ef', '6D 5E 34 72', '2025-07-13', '2025-07-13 17:17:53.744374+00', 'sent');


--
-- Data for Name: checkout; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."checkout" ("id", "user_id", "day", "checkout_time", "notification_status") VALUES
	('75efbc8e-078e-4e75-9420-205e8f8cc6c6', '8D 67 2B 72', '2025-07-13', '2025-07-13 15:40:32.438158+00', 'sent'),
	('60958b1d-1e55-4a04-a6aa-49f2cab10768', 'ED BF 34 72', '2025-07-13', '2025-07-13 15:42:46.717876+00', 'sent'),
	('88e58521-899f-494f-8e04-4fc65d26b2cf', 'ED BF 34 72', '2025-07-13', '2025-07-13 15:42:49.33518+00', 'sent'),
	('239c33c7-e2d7-4e87-911d-e009f7e4c421', '6D 5E 34 72', '2025-07-13', '2025-07-13 20:04:32.893861+00', 'sent'),
	('564c14dc-d4c1-4767-998d-1b066db6ae06', 'ED BF 34 72', '2025-07-13', '2025-07-13 17:11:43.941379+00', 'not_sent'),
	('61f58061-5400-4c95-922f-3b5e079543bd', '6D 5E 34 72', '2025-07-13', '2025-07-13 17:11:51.764158+00', 'not_sent'),
	('e6400e30-d304-44b8-b88b-8f64fb1d3258', '6D 5E 34 72', '2025-07-13', '2025-07-13 17:13:13.566804+00', 'not_sent'),
	('6b35d78c-6040-4d4c-b1b7-a5e9a0ac383d', '6D 5E 34 72', '2025-07-13', '2025-07-13 17:14:58.131927+00', 'not_sent');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 8, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
