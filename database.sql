--
-- PostgreSQL database dump
--

\restrict 2dNgL8ptDy3DhlGsmqLkcP8WaJwaF0UgcSvwxQ0zfvhpeRjHZLEH9qOF5NoUk1i

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-19 13:22:35

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
-- TOC entry 5 (class 2615 OID 16712)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 18372)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    role character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18371)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 220 (class 1259 OID 18356)
-- Name: vacation_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vacation_request (
    id integer NOT NULL,
    start_date character varying NOT NULL,
    end_date character varying NOT NULL,
    reason character varying,
    status character varying DEFAULT 'Pending'::character varying NOT NULL,
    comments character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.vacation_request OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18355)
-- Name: vacation_request_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vacation_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacation_request_id_seq OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 219
-- Name: vacation_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vacation_request_id_seq OWNED BY public.vacation_request.id;


--
-- TOC entry 4864 (class 2604 OID 18375)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 18359)
-- Name: vacation_request id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacation_request ALTER COLUMN id SET DEFAULT nextval('public.vacation_request_id_seq'::regclass);


--
-- TOC entry 5022 (class 0 OID 18372)
-- Dependencies: 222
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, role, email, password) FROM stdin;
4	requester	Requester	requester@test.com	123456
5	validator	Validator	validator@test.com	123456
\.


--
-- TOC entry 5020 (class 0 OID 18356)
-- Dependencies: 220
-- Data for Name: vacation_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vacation_request (id, start_date, end_date, reason, status, comments, created_at, "userId") FROM stdin;
6	2026-08-18	2026-08-25		Pending		2026-05-19 11:36:31.847169	4
4	2026-06-06	2026-06-10		Approved		2026-05-19 11:36:09.406501	4
5	2026-06-18	2026-07-18		Rejected	too long	2026-05-19 11:36:18.382941	4
\.


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 219
-- Name: vacation_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vacation_request_id_seq', 6, true);


--
-- TOC entry 4866 (class 2606 OID 18370)
-- Name: vacation_request PK_60c658ca3f19e316769eb70c481; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacation_request
    ADD CONSTRAINT "PK_60c658ca3f19e316769eb70c481" PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 18384)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 18386)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4871 (class 2606 OID 18387)
-- Name: vacation_request FK_c59858dd42a4f5eeb5c003fcfdc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacation_request
    ADD CONSTRAINT "FK_c59858dd42a4f5eeb5c003fcfdc" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-05-19 13:22:35

--
-- PostgreSQL database dump complete
--

\unrestrict 2dNgL8ptDy3DhlGsmqLkcP8WaJwaF0UgcSvwxQ0zfvhpeRjHZLEH9qOF5NoUk1i

