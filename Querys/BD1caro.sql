DROP TABLE DETALLE_VEN;
DROP TABLE VEN_TIP;
DROP TABLE TP_DEBITO;
DROP TABLE TP_CREDITO;
DROP TABLE TP_CHEQUE;
DROP TABLE TP_TRANSFERENCIA;
DROP TABLE SOL_AMM;
DROP TABLE ALI_MM;
DROP TABLE MIN_MIN;
DROP TABLE YAC_MIN;
DROP TABLE MAQ_FAS;
DROP TABLE TM_FAS;
DROP TABLE SOLICITUD_COMPRA;
DROP TABLE INVENTARIO;
DROP TABLE MIN_PRE;
DROP TABLE MIN_NO_METALICO;
DROP TABLE MIN_METALICO;
DROP TABLE HOR_ECF;
DROP TABLE EMP_CF;
DROP TABLE CAR_FAS;
DROP TABLE FASE CASCADE;
DROP TABLE ETAPA;
DROP TABLE YACIMIENTO;
DROP TABLE EXPLOTACION;
DROP TABLE VENTA;
DROP TABLE CLIENTE;
DROP TABLE MAQUINARIA;
DROP TABLE TIPO_MAQUINARIA;
DROP TABLE ALIADO_COMERCIAL;
DROP TABLE USUARIO;
DROP TABLE EMPLEADO;
DROP TABLE PRESENTACION;
DROP TABLE ROL_PRI;
DROP TABLE PRIVILEGIO;
DROP TABLE ROL;
DROP TABLE CARGO;
DROP TABLE LUGAR;
DROP TABLE HORARIO;
DROP TABLE ESTATUS;

CREATE TABLE ESTATUS (
	EST_CODIGO SERIAL,
	EST_NOMBRE VARCHAR (50) NOT NULL,
	CONSTRAINT PK_CODIGO_ESTATUS PRIMARY KEY (EST_CODIGO)
);

CREATE TABLE HORARIO (
	HOR_CODIGO SERIAL,
	HOR_DIA VARCHAR (50) NOT NULL,
	HOR_HORAINICIO DATE NOT NULL,
	HOR_HORAFIN DATE NOT NULL
	CONSTRAINT CHECK_DIA_HORARIO CHECK(HOR_DIA IN ('LUNES','MARTES','MIERCOLES','JUEVES','VIERNES')),
	CONSTRAINT PK_CODIGO_HORARIO PRIMARY KEY (HOR_CODIGO)
);

CREATE TABLE LUGAR (
	LUG_CODIGO SERIAL,
	LUG_NOMBRE VARCHAR(50) NOT NULL,
	LUG_TIPO VARCHAR(50) NOT NULL,
	FK_LUG_LUGAR INTEGER,
	CONSTRAINT PK_CODIGO_LUGAR PRIMARY KEY (LUG_CODIGO),
	CONSTRAINT CHECK_TIPO_LUGAR CHECK (LUG_TIPO IN ('ESTADO','PARROQUIA','MUNICIPIO')),
	CONSTRAINT FK_LUGAR_LUGAR FOREIGN KEY (FK_LUG_LUGAR) REFERENCES LUGAR (LUG_CODIGO)
);

CREATE TABLE CARGO (
	CAR_CODIGO SERIAL,
	CAR_NOMBRE VARCHAR (50) NOT NULL,
	CONSTRAINT PK_CODIGO_CARGO PRIMARY KEY (CAR_CODIGO)
);

CREATE TABLE ROL (
	ROL_CODIGO SERIAL,
	ROL_NOMBRE VARCHAR(50) NOT NULL,
	CONSTRAINT PK_CODIGO_ROL PRIMARY KEY (ROL_CODIGO),
	CONSTRAINT CHECK_ROL CHECK (ROL_NOMBRE IN ('ADMINISTRADOR','VENDEDOR','RH','ESPECIALISTA','GESTOR'))
);

CREATE TABLE PRIVILEGIO(
	PRI_CODIGO SERIAL,
	PRI_NOMBRE VARCHAR(50) NOT NULL,
	CONSTRAINT PK_CODIGO_PRIVILEGIO PRIMARY KEY (PRI_CODIGO)
);

CREATE TABLE ROL_PRI (
	RP_CODIGO SERIAL,
	FK_RP_ROL INTEGER NOT NULL,
	FK_RP_PRIVILEGIO INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_RP PRIMARY KEY (RP_CODIGO),
	CONSTRAINT FK_ROL_RP FOREIGN KEY (FK_RP_ROL) REFERENCES ROL (ROL_CODIGO),
	CONSTRAINT FK_PRIVILEGIO_RP FOREIGN KEY (FK_RP_PRIVILEGIO) REFERENCES PRIVILEGIO (PRI_CODIGO)
);

CREATE TABLE PRESENTACION(
	PRE_CODIGO SERIAL,
	PRE_NOMBRE VARCHAR(50) NOT NULL,
	CONSTRAINT PK_CODIGO_PRESENTACION PRIMARY KEY (PRE_CODIGO)
);

CREATE TABLE EMPLEADO(
	EMP_CODIGO SERIAL,
	EMP_CEDULA NUMERIC(8) NOT NULL UNIQUE,
	EMP_NOMBRE VARCHAR(50) NOT NULL,
	EMP_APELLIDO VARCHAR(50) NOT NULL,
	EMP_FECHANACIMIENTO DATE NOT NULL,
	EMP_GENERO CHAR(1) NOT NULL,
	EMP_TELEFONO NUMERIC(15) NOT NULL,
	FK_EMP_CARGO INTEGER NOT NULL,
	FK_EMP_LUGAR INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_EMPLEADO PRIMARY KEY (EMP_CODIGO),
	CONSTRAINT CHECK_GENERO CHECK (EMP_GENERO IN ('M','F','O')),
	CONSTRAINT FK_CARGO_EMPLEADO FOREIGN KEY(FK_EMP_CARGO) REFERENCES CARGO (CAR_CODIGO),
	CONSTRAINT FK_LUGAR_EMPLEADO FOREIGN KEY(FK_EMP_LUGAR) REFERENCES LUGAR (LUG_CODIGO)
);

CREATE TABLE USUARIO(
	USU_USUARIO_ID SERIAL,
	USU_USUARIO VARCHAR(50) NOT NULL UNIQUE,
	USU_PASSWORD VARCHAR(50) NOT NULL,
	FK_USU_EMPLEADO INTEGER  NOT NULL UNIQUE,
	FK_USU_ROL INTEGER NOT NULL,
	CONSTRAINT PK_USUARIO_ID PRIMARY KEY (USU_USUARIO_ID),
	CONSTRAINT FK_ROL_USUARIO FOREIGN KEY (FK_USU_ROL) REFERENCES ROL (ROL_CODIGO),
	CONSTRAINT FK_EMPLEADO_USUARIO FOREIGN KEY (FK_USU_EMPLEADO) REFERENCES EMPLEADO (EMP_CODIGO) ON DELETE CASCADE
);

CREATE TABLE ALIADO_COMERCIAL (
	AC_NUMERO_RIF VARCHAR(50) NOT NULL UNIQUE,
	AC_NOMBRE VARCHAR(50) NOT NULL,
	AC_TELEFONO NUMERIC(15) NOT NULL,
	FK_AC_LUGAR INTEGER NOT NULL,
	CONSTRAINT PK_NUMERO_RIF_ALIADO_COMERCIAL PRIMARY KEY(AC_NUMERO_RIF),
	CONSTRAINT FK_LUGAR_ALIADO_COMERCIAL FOREIGN KEY (FK_AC_LUGAR) REFERENCES LUGAR (LUG_CODIGO)
);

CREATE TABLE TIPO_MAQUINARIA(
	TM_CODIGO SERIAL, 
	TM_NOMBRE VARCHAR(50) NOT NULL,
	CONSTRAINT PK_CODIGO_TIPO_MAQUINARIA PRIMARY KEY (TM_CODIGO)
);

CREATE TABLE MAQUINARIA(
	MAQ_CODIGO SERIAL,
	MAQ_NOMBRE VARCHAR(50) NOT NULL,
	FK_MAQ_TIPO INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_MAQUINARIA PRIMARY KEY (MAQ_CODIGO),
	CONSTRAINT FK_TIPO_MAQUINARIA FOREIGN KEY (FK_MAQ_TIPO) REFERENCES TIPO_MAQUINARIA(TM_CODIGO)
);

CREATE TABLE CLIENTE (
	CLI_CODIGO SERIAL,
	CLI_CEDULA NUMERIC(8) NOT NULL UNIQUE,
	CLI_NOMBRE VARCHAR(50) NOT NULL,
	CLI_APELLIDO VARCHAR(50) NOT NULL,
	CLI_TELEFONO NUMERIC(10) NOT NULL,
	FK_CLI_LUGAR INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_CLIENTE PRIMARY KEY (CLI_CODIGO),
	CONSTRAINT FK_LUGAR_CLIENTE FOREIGN KEY (FK_CLI_LUGAR) REFERENCES LUGAR(LUG_CODIGO)
);

CREATE TABLE VENTA(
	VEN_CODIGO SERIAL,
	VEN_FECHA DATE NOT NULL,
	VEN_MONTOTOTAL NUMERIC(15,2) NOT NULL,
	FK_VEN_CLIENTE INTEGER NOT NULL,
	FK_VEN_USUARIO INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_VENTA PRIMARY KEY (VEN_CODIGO),
	CONSTRAINT FK_CLIENTE_VENTA FOREIGN KEY (FK_VEN_CLIENTE) REFERENCES CLIENTE(CLI_CODIGO),
	CONSTRAINT FK_USUARIO_VENTA FOREIGN KEY (FK_VEN_USUARIO) REFERENCES USUARIO(USU_USUARIO_ID),
	CONSTRAINT CHECK_MONTOTOTAL_VENTA CHECK (VEN_MONTOTOTAL > 0)
);

CREATE TABLE EXPLOTACION(
	EXP_CODIGO SERIAL,
	EXP_FECHAINICIO DATE,
	EXP_FECHAFIN DATE,
	EXP_COSTOTOTAL NUMERIC(15,2),
	FK_EXP_ESTATUS INTEGER NOT NULL,
	FK_EXP_VENTA INTEGER,
	CONSTRAINT PK_CODIGO_EXPLOTACION PRIMARY KEY (EXP_CODIGO),
	CONSTRAINT FK_ESTATUS_EXPLOTACION FOREIGN KEY (FK_EXP_ESTATUS) REFERENCES ESTATUS(EST_CODIGO),
	CONSTRAINT FK_VENTA_EXPLOTACION FOREIGN KEY (FK_EXP_VENTA) REFERENCES VENTA(VEN_CODIGO),
	CONSTRAINT CHECK_COSTOTOTAL_EXPLOTACION CHECK (EXP_COSTOTOTAL > 0)
);

CREATE TABLE YACIMIENTO(
	YAC_CODIGO SERIAL,
	YAC_EXTENSION NUMERIC(15,2) NOT NULL,
	YAC_FECHAREGISTRO DATE NOT NULL,
	YAC_NOMBRE VARCHAR (50) NOT NULL UNIQUE,
	FK_YAC_ESTATUS INTEGER NOT NULL,
	FK_YAC_LUGAR INTEGER NOT NULL,
	FK_YAC_EXPLOTACION INTEGER,
	CONSTRAINT PF_CODIGO_YACIMIENTO PRIMARY KEY (YAC_CODIGO),
	CONSTRAINT FK_EXPLOTACION_YACIMIENTO FOREIGN KEY (FK_YAC_EXPLOTACION) REFERENCES EXPLOTACION(EXP_CODIGO),
	CONSTRAINT FK_ESTATUS_YACIMIENTO FOREIGN KEY (FK_YAC_ESTATUS) REFERENCES ESTATUS(EST_CODIGO),
	CONSTRAINT FK_LUGAR_YACIMIENTO FOREIGN KEY (FK_YAC_LUGAR) REFERENCES LUGAR(LUG_CODIGO)
);

CREATE TABLE ETAPA (
	ETA_CODIGO SERIAL,
	ETA_NOMBRE VARCHAR(50) NOT NULL,
	ETA_FECHAINICIO DATE,
	ETA_FECHAFIN DATE,
	ETA_COSTOTOTAL NUMERIC(15,2),
	FK_ETA_EXPLOTACION INTEGER,
	FK_ETA_ESTATUS INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_ETAPA PRIMARY KEY (ETA_CODIGO),
	CONSTRAINT FK_ESTATUS_ETAPA FOREIGN KEY (FK_ETA_ESTATUS) REFERENCES ESTATUS (EST_CODIGO),
	CONSTRAINT FK_EXPLOTACION_ETAPA FOREIGN KEY (FK_ETA_EXPLOTACION) REFERENCES EXPLOTACION (EXP_CODIGO),
	CONSTRAINT CHECK_COSTOTOTAL_ETAPA CHECK (ETA_COSTOTOTAL > 0)
);

CREATE TABLE FASE(
	FAS_CODIGO SERIAL,
	FAS_NOMBRE VARCHAR(50) NOT NULL,
	FAS_FECHAINICIO DATE,
	FAS_FECHAFIN DATE,
	FAS_COSTOTOTAL NUMERIC(15,2),
	FK_FAS_ETAPA INTEGER NOT NULL,
	FK_FAS_ESTATUS INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_FASE PRIMARY KEY (FAS_CODIGO),
	CONSTRAINT FK_ETAPA_FASE FOREIGN KEY (FK_FAS_ETAPA) REFERENCES ETAPA (ETA_CODIGO),
	CONSTRAINT FK_ESTATUS_FASE FOREIGN KEY (FK_FAS_ESTATUS) REFERENCES ESTATUS (EST_CODIGO),
	CONSTRAINT CHECK_COSTOTOTAL_FASE CHECK (FAS_COSTOTOTAL > 0)
);

CREATE TABLE CAR_FAS(
	CF_CODIGO SERIAL,
	CF_CANTIDAD INTEGER NOT NULL DEFAULT 0,
	FK_CF_CARGO INTEGER NOT NULL,
	FK_CF_FASE INTEGER NOT NULL,
	CONSTRAINT FK_CARGO_CF FOREIGN KEY (FK_CF_CARGO) REFERENCES CARGO (CAR_CODIGO),
	CONSTRAINT FK_FASE_CF FOREIGN KEY (FK_CF_FASE) REFERENCES FASE (FAS_CODIGO),
	CONSTRAINT PK_CODIGO_CF PRIMARY KEY (CF_CODIGO)
);

CREATE TABLE EMP_CF(
	ECF_CODIGO SERIAL,
	ECF_SUELDO NUMERIC(15,2) NOT NULL,
	FK_ECF_EMPLEADO INTEGER NOT NULL,
	FK_ECF_CARFAS INTEGER NOT NULL,
	FK_ECF_ESTATUS INTEGER NOT NULL,
	CONSTRAINT FK_EMPLEADO_ECF FOREIGN KEY (FK_ECF_EMPLEADO) REFERENCES EMPLEADO (EMP_CODIGO),
	CONSTRAINT FK_CARFAS_ECF FOREIGN KEY (FK_ECF_CARFAS) REFERENCES CAR_FAS (CF_CODIGO),
	CONSTRAINT FK_ECF_ESTATUS FOREIGN KEY (FK_ECF_ESTATUS) REFERENCES ESTATUS (EST_CODIGO),
	CONSTRAINT PK_CODIGO_ECF PRIMARY KEY (ECF_CODIGO),
	CONSTRAINT CHECK_SUELDO_ECF CHECK (ECF_SUELDO>0)
);

CREATE TABLE TM_FAS(
	TMF_CODIGO SERIAL,
	TMF_CANTIDAD NUMERIC(25) NOT NULL DEFAULT 0,
	FK_TMF_TM INTEGER NOT NULL,
	FK_TMF_FASE INTEGER NOT NULL,
	CONSTRAINT FK_TMF_FAS FOREIGN KEY (FK_TMF_FASE) REFERENCES FASE (FAS_CODIGO),
	CONSTRAINT FK_TMF_TM FOREIGN KEY (FK_TMF_TM) REFERENCES TIPO_MAQUINARIA (TM_CODIGO),
	CONSTRAINT PK_CODIGO_TMF PRIMARY KEY (TMF_CODIGO)
);

CREATE TABLE HOR_ECF(
	HECF_CODIGO SERIAL,
	FK_HECF_ECF INTEGER NOT NULL,
	FK_HECF_HOR INTEGER NOT NULL,
	CONSTRAINT FK_ECF_HECF FOREIGN KEY (FK_HECF_ECF) REFERENCES EMP_CF (ECF_CODIGO),
	CONSTRAINT FK_HORARIO_HECF FOREIGN KEY (FK_HECF_HOR) REFERENCES HORARIO (HOR_CODIGO),
	CONSTRAINT PK_CODIGO_HECF PRIMARY KEY (HECF_CODIGO)
);

CREATE TABLE MIN_METALICO (
	MET_CODIGO SERIAL,
	MET_NOMBRE VARCHAR (50) NOT NULL UNIQUE,
	MET_ESCALAMALEABILIDAD NUMERIC(10) NOT NULL,
	MET_ESCALADUREZA NUMERIC(10) NOT NULL,
	CONSTRAINT PK_CODIGO_MET PRIMARY KEY (MET_CODIGO)
);

CREATE TABLE MIN_NO_METALICO (
	NOM_CODIGO SERIAL,
	NOM_NOMBRE VARCHAR (50) NOT NULL UNIQUE,
	NOM_UTILIDAD VARCHAR (50),
	CONSTRAINT PK_CODIGO_NOM PRIMARY KEY (NOM_CODIGO)
);

CREATE TABLE MIN_PRE(
	MP_CODIGO SERIAL,
	MP_PRECIO NUMERIC (15,2) NOT NULL,
	FK_MP_PRESENTACION INTEGER NOT NULL,
	FK_MP_METALICO INTEGER,
	FK_MP_NOMETALICO INTEGER,
	CONSTRAINT PK_CODIGO_MP PRIMARY KEY (MP_CODIGO),
	CONSTRAINT FK_PRESENTACION_MP FOREIGN KEY (FK_MP_PRESENTACION) REFERENCES  PRESENTACION (PRE_CODIGO),
	CONSTRAINT FK_METALICO_MP FOREIGN KEY (FK_MP_METALICO) REFERENCES MIN_METALICO (MET_CODIGO),
	CONSTRAINT FK_NOMETALICO_MP FOREIGN KEY (FK_MP_NOMETALICO) REFERENCES MIN_NO_METALICO (NOM_CODIGO)
);

CREATE TABLE INVENTARIO (
	INV_CODIGO SERIAL,
	INV_CANTIDADMOVIMIENTO NUMERIC(15,2) NOT NULL,
	INV_CANTIDADACTUAL NUMERIC(15,2) NOT NULL,
	INV_FECHAMOVIMIENTO DATE NOT NULL,
	FK_INV_VENTA INTEGER,
	FK_INV_EXPLOTACION INTEGER ,
	FK_INV_MINPRE INTEGER,
	CONSTRAINT FK_EXPLOTACION_INVENTARIO FOREIGN KEY (FK_INV_EXPLOTACION) REFERENCES EXPLOTACION (EXP_CODIGO),
	CONSTRAINT FK_VENTA_INVENTARIO FOREIGN KEY (FK_INV_VENTA) REFERENCES VENTA (VEN_CODIGO),
	CONSTRAINT FK_MINPRE_INVENTARIO FOREIGN KEY (FK_INV_MINPRE) REFERENCES MIN_PRE (MP_CODIGO),
	CONSTRAINT PK_CODIGO_INVENTARIO PRIMARY KEY (INV_CODIGO),
	CONSTRAINT CHECK_CANTIDADACTUAL_INV CHECK (INV_CANTIDADACTUAL>=0)
);

CREATE TABLE SOLICITUD_COMPRA(
	SC_CODIGO SERIAL,
	SC_FECHAEMISION DATE NOT NULL,
	SC_COSTOTOTAL NUMERIC (15,2) NOT NULL,
	FK_SC_ALIADO VARCHAR(50) NOT NULL,
	FK_SC_ESTATUS INTEGER NOT NULL,
	FK_SC_EXPLOTACION INTEGER NOT NULL,
	CONSTRAINT FK_ESTATUS_SOLICITUD_COMPRA FOREIGN KEY (FK_SC_ESTATUS) REFERENCES ESTATUS (EST_CODIGO),
	CONSTRAINT FK_EXPLOTACION_SOLICITUD_COMPRE FOREIGN KEY (FK_SC_EXPLOTACION) REFERENCES EXPLOTACION (EXP_CODIGO),
	CONSTRAINT FK_ALIADO_SOLICITUD_COMPRA FOREIGN KEY (FK_SC_ALIADO) REFERENCES ALIADO_COMERCIAL (AC_NUMERO_RIF),
	CONSTRAINT PK_CODIGO_SOLICITUD_COMPRA PRIMARY KEY (SC_CODIGO),
	CONSTRAINT CHECK_COSTOTOTAL_SC CHECK (SC_COSTOTOTAL>0)
);

CREATE TABLE MAQ_FAS (
	MF_CODIGO SERIAL,
	MF_COSTO NUMERIC (15,2) NOT NULL,
	FK_MF_MAQUINARIA INTEGER NOT NULL,
	FK_MF_FASE INTEGER NOT NULL,
	FK_MF_ESTATUS INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_MF PRIMARY KEY (MF_CODIGO),
	CONSTRAINT FK_MAQUINARIA_MF FOREIGN KEY (FK_MF_MAQUINARIA) REFERENCES MAQUINARIA (MAQ_CODIGO),
	CONSTRAINT FK_FASE_MF FOREIGN KEY (FK_MF_FASE) REFERENCES FASE (FAS_CODIGO),
	CONSTRAINT FK_ESTATUS_MF FOREIGN KEY (FK_MF_ESTATUS) REFERENCES ESTATUS (EST_CODIGO),
	CONSTRAINT CHECK_ESTATUS_MF CHECK (MF_COSTO>0)
);

CREATE TABLE YAC_MIN (
	YM_CODIGO SERIAL,
	FK_YM_YACIMIENTO INTEGER NOT NULL,
	FK_YM_MINMETALICO INTEGER,
	FK_YM_MINNOMETALICO INTEGER,
	YM_CANTIDAD NUMERIC (25,2) NOT NULL,
	CONSTRAINT PK_CODIGO_YM PRIMARY KEY (YM_CODIGO),
	CONSTRAINT FK_YACIMIENTO_YM FOREIGN KEY (FK_YM_YACIMIENTO) REFERENCES YACIMIENTO (YAC_CODIGO) ON DELETE CASCADE,
	CONSTRAINT FK_MINMETALICO_YM FOREIGN KEY (FK_YM_MINMETALICO) REFERENCES MIN_METALICO (MET_CODIGO) ON DELETE CASCADE,
	CONSTRAINT FK_MINNOMETALICO_YM FOREIGN KEY (FK_YM_MINNOMETALICO) REFERENCES MIN_NO_METALICO (NOM_CODIGO) ON DELETE CASCADE,
	CONSTRAINT CHECK_CANTIDAD_YM CHECK (YM_CANTIDAD>0)
	
);

CREATE TABLE MIN_MIN (
	MM_CODIGO SERIAL,
	MM_PROPORCIONM1M2 NUMERIC(10,2),
	FK_MM_1METALICO INTEGER ,
	FK_MM_1NOMETALICO INTEGER,
	FK_MM_2METALICO INTEGER ,
	FK_MM_2NOMETALICO INTEGER,
	CONSTRAINT PK_CODIGO_MM PRIMARY KEY (MM_CODIGO),
	CONSTRAINT FK_1METALICO_MM FOREIGN KEY (FK_MM_1METALICO) REFERENCES MIN_METALICO (MET_CODIGO),
	CONSTRAINT FK_1NOMETALICO_MM FOREIGN KEY (FK_MM_1NOMETALICO) REFERENCES MIN_NO_METALICO (NOM_CODIGO),
	CONSTRAINT FK_2METALICO_MM FOREIGN KEY (FK_MM_2METALICO) REFERENCES MIN_METALICO (MET_CODIGO),
	CONSTRAINT FK_2NOMETALICO_MM FOREIGN KEY (FK_MM_2NOMETALICO) REFERENCES MIN_NO_METALICO (NOM_CODIGO)
);

CREATE TABLE ALI_MM (
	AMM_CODIGO SERIAL,
	FK_AMM_ALIADO VARCHAR(50) NOT NULL,
	FK_AMM_MM INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_AMM PRIMARY KEY (AMM_CODIGO),
	CONSTRAINT FK_ALIADO_AMM FOREIGN KEY (FK_AMM_ALIADO) REFERENCES ALIADO_COMERCIAL (AC_NUMERO_RIF),
	CONSTRAINT FK_MM_AMM FOREIGN KEY (FK_AMM_MM) REFERENCES MIN_MIN (MM_CODIGO)
);

CREATE TABLE SOL_AMM (
	SAMM_CODIGO SERIAL,
	SAMM_CANTIDAD NUMERIC (10,2) NOT NULL,
	SAMM_COSTO NUMERIC (10,2) NOT NULL,
	FK_SAMM_SOLICITUD INTEGER NOT NULL,
	FK_SAMM_AMM INTEGER NOT NULL,
	CONSTRAINT PK_CODIGO_SAMM PRIMARY KEY (SAMM_CODIGO),
	CONSTRAINT FK_SOLICITUD_SAMM FOREIGN KEY (FK_SAMM_SOLICITUD) REFERENCES SOLICITUD_COMPRA(SC_CODIGO),
	CONSTRAINT FK_AMM_SAMM FOREIGN KEY (FK_SAMM_AMM) REFERENCES ALI_MM (AMM_CODIGO),
	CONSTRAINT CHECK_CANTIDAD_SAMM CHECK (SAMM_CANTIDAD>0),
	CONSTRAINT CHECK_COSTO_SAMM CHECK (SAMM_COSTO>0)
);

CREATE TABLE TP_TRANSFERENCIA (
	TPT_CODIGO SERIAL,
	TPT_NUMERO INTEGER NOT NULL,
	TPT_BANCO VARCHAR (50) NOT NULL,
	TPT_CUENTA INTEGER NOT NULL UNIQUE,
	CONSTRAINT PK_CODIGO_TPT PRIMARY KEY (TPT_CODIGO),
	CONSTRAINT CHECK_NUMERO_TPT CHECK (TPT_NUMERO>0),
	CONSTRAINT CHECK_CUENTA_TPT CHECK (TPT_CUENTA>0)
);

CREATE TABLE TP_CHEQUE (
	TPCH_CODIGO SERIAL,
	TPCH_NUMERO INTEGER NOT NULL,
	TPCH_BANCO VARCHAR (50) NOT NULL,
	TPCH_CUENTA INTEGER NOT NULL UNIQUE,
	CONSTRAINT PK_CODIGO_TPCH PRIMARY KEY (TPCH_CODIGO),
	CONSTRAINT CHECK_NUMERO_TPCH CHECK (TPCH_NUMERO>0),
	CONSTRAINT CHECK_CUENTA_TPCH CHECK (TPCH_CUENTA>0)
);

CREATE TABLE TP_CREDITO (
	TPC_CODIGO SERIAL,
	TPC_NUMERO INTEGER NOT NULL,
	TPC_BANCO VARCHAR (50) NOT NULL,
	TPC_TIPOCREDITO  VARCHAR (50)NOT NULL,
	CONSTRAINT PK_CODIGO_TPC PRIMARY KEY (TPC_CODIGO),
	CONSTRAINT CHECK_NUMERO_TPC CHECK (TPC_NUMERO>0),
	CONSTRAINT CHECK_TIPOCREDITO_TPC CHECK (TPC_TIPOCREDITO IN ('VISA','MASTER','AMERICAN EXPRESS'))
);


CREATE TABLE TP_DEBITO (
	TPD_CODIGO SERIAL,
	TPD_NUMERO INTEGER NOT NULL,
	TPD_BANCO VARCHAR (50) NOT NULL,
	TPD_TIPODEBITO  VARCHAR (50)NOT NULL,
	CONSTRAINT PK_CODIGO_TPD PRIMARY KEY (TPD_CODIGO),
	CONSTRAINT CHECK_NUMERO_TPD CHECK (TPD_NUMERO>0),
	CONSTRAINT CHECK_TIPODEBITO_TPD CHECK (TPD_TIPODEBITO IN ('MAESTRO','SUICHE7B'))
);

CREATE TABLE VEN_TIP(
	VT_CODIGO SERIAL,
	VT_FECHA DATE NOT NULL,
	VT_MONTO NUMERIC (25,2) NOT NULL,
	FK_VT_TPTRANSFERENCIA INTEGER,
	FK_VT_TPCREDITO INTEGER,
	FK_VT_TPDEBITO INTEGER,
	FK_VT_TPCHEQUE INTEGER,
	FK_VT_VENTA INTEGER  NOT NULL,
	CONSTRAINT FK_VENTA_VENTIP FOREIGN KEY (FK_VT_VENTA) REFERENCES VENTA (VEN_CODIGO),
	CONSTRAINT FK_TPTRANSFERENCIA_VENTIP FOREIGN KEY (FK_VT_TPTRANSFERENCIA) REFERENCES TP_TRANSFERENCIA (TPT_CODIGO),
	CONSTRAINT FK_TPCREDITO_VENTIP FOREIGN KEY (FK_VT_TPCREDITO) REFERENCES TP_CREDITO (TPC_CODIGO),
	CONSTRAINT FK_TPDEBITO_VENTIP FOREIGN KEY (FK_VT_TPDEBITO) REFERENCES TP_DEBITO (TPD_CODIGO),															
	CONSTRAINT FK_TPCHEQUE_VENTIP FOREIGN KEY (FK_VT_TPCHEQUE) REFERENCES TP_CHEQUE (TPCH_CODIGO),
	CONSTRAINT PK_CODIGO_VEN_TIP PRIMARY KEY (VT_CODIGO),
	CONSTRAINT CHECK_MONTO_VT CHECK (VT_MONTO>0)
);

CREATE TABLE DETALLE_VEN(
	DEV_CODIGO SERIAL,
	FK_DEV_VENTA INTEGER  NOT NULL,
	DEV_MONTO NUMERIC (25,2) NOT NULL,
	DEV_CANTIDAD NUMERIC (10,2) NOT NULL,
	FK_DEV_MIN_PRE INTEGER NOT NULL,
	CONSTRAINT FK_VENTA_DEV FOREIGN KEY (FK_DEV_VENTA) REFERENCES VENTA (VEN_CODIGO),
	CONSTRAINT FK_MINERAL_PRESENTACION_DEV FOREIGN KEY (FK_DEV_MIN_PRE) REFERENCES MIN_PRE (MP_CODIGO),
	CONSTRAINT PK_CODIGO_DEV PRIMARY KEY (DEV_CODIGO),
	CONSTRAINT CHECK_MONTO_DEV CHECK (DEV_MONTO>0),
	CONSTRAINT CHECK_CANTIDAD_DEV CHECK (DEV_CANTIDAD>0)
);


-- INSERTS

INSERT INTO estatus(
	est_codigo, est_nombre)
	VALUES 
	(nextval ('estatus_est_codigo_seq'), 'Disponible'),
	(nextval ('estatus_est_codigo_seq'), 'Eliminado'),
	(nextval ('estatus_est_codigo_seq'), 'Ocupado'),
	(nextval ('estatus_est_codigo_seq'), 'En proceso'),
	(nextval ('estatus_est_codigo_seq'), 'Pagado'),
	(nextval ('estatus_est_codigo_seq'), 'Agotado');


INSERT INTO lugar(
	lug_codigo, lug_nombre, lug_tipo, fk_lug_lugar)
	VALUES
	(nextval('lugar_lug_codigo_seq'), 'Amazonas', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Anzoátegui', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Apure', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Aragua', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Barinas', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Carabobo', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Cojedes', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Delta Amacuro', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Falcón', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Guárico', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Lara', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Mérida', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Miranda', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Monagas', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Nueva Esparta', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Portuguesa', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Sucre', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Táchira', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Trujillo', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Vargas', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Yaracuy', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Zulia', 'ESTADO',null),
	(nextval('lugar_lug_codigo_seq'), 'Distrito Capital', 'ESTADO',null),


	(nextval('lugar_lug_codigo_seq'), 'Alto Orinoco','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Atabapo','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Atures','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Autana','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Manapiare','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Maroa','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Río Negro','MUNICIPIO',1),
	(nextval('lugar_lug_codigo_seq'), 'Anaco','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Aragua','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Manuel Ezequiel Bruzual','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Diego Bautista Urbaneja','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Fernando Peñalver','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Francisco Del Carmen Carvajal','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'General Sir Arthur McGregor','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Guanta','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Independencia','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'José Gregorio Monagas','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Juan Antonio Sotillo','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Juan Manuel Cajigal','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Libertad','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Francisco de Miranda','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Pedro María Freites','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Píritu','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'San José de Guanipa','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'San Juan de Capistrano','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Santa Ana','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Simón Bolívar','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Simón Rodríguez','MUNICIPIO',2),
	(nextval('lugar_lug_codigo_seq'), 'Achaguas','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Biruaca','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Muñóz','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Páez','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Pedro Camejo','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Rómulo Gallegos','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'San Fernando','MUNICIPIO',3),
	(nextval('lugar_lug_codigo_seq'), 'Atanasio Girardot','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Camatagua','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Francisco Linares Alcántara','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'José Ángel Lamas','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'José Félix Ribas','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'José Rafael Revenga','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Mario Briceño Iragorry','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Ocumare de la Costa de Oro','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'San Casimiro','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'San Sebastián','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Santiago Mariño','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Santos Michelena','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Tovar','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Urdaneta','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Zamora','MUNICIPIO',4),
	(nextval('lugar_lug_codigo_seq'), 'Alberto Arvelo Torrealba','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Eloy Blanco','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Antonio José de Sucre','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Arismendi','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Barinas','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Cruz Paredes','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Ezequiel Zamora','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Obispos','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Pedraza','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Rojas','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Sosa','MUNICIPIO',5),
	(nextval('lugar_lug_codigo_seq'), 'Caroní','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Cedeño','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'El Callao','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Gran Sabana','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Heres','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Piar','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Angostura (Raúl Leoni)','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Roscio','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Sifontes','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Padre Pedro Chien','MUNICIPIO',6),
	(nextval('lugar_lug_codigo_seq'), 'Bejuma','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Carlos Arvelo','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Diego Ibarra','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Guacara','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Juan José Mora','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Los Guayos','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Miranda','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Montalbán','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Naguanagua','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Puerto Cabello','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'San Diego','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'San Joaquín','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Valencia','MUNICIPIO',7),
	(nextval('lugar_lug_codigo_seq'), 'Anzoátegui','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Tinaquillo','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Girardot','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Lima Blanco','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Pao de San Juan Bautista','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Ricaurte','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Rómulo Gallegos','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'San Carlos','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Tinaco','MUNICIPIO',8),
	(nextval('lugar_lug_codigo_seq'), 'Antonio Díaz','MUNICIPIO',9),
	(nextval('lugar_lug_codigo_seq'), 'Casacoima','MUNICIPIO',9),
	(nextval('lugar_lug_codigo_seq'), 'Pedernales','MUNICIPIO',9),
	(nextval('lugar_lug_codigo_seq'), 'Tucupita','MUNICIPIO',9),
	(nextval('lugar_lug_codigo_seq'), 'Acosta','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Buchivacoa','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Cacique Manaure','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Carirubana','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Colina','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Dabajuro','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Democracia','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Falcón','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Federación','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Jacura','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'José Laurencio Silva','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Los Taques','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Mauroa','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Miranda','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Monseñor Iturriza','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Palmasola','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Petit','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Píritu','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'San Francisco','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Tocópero','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Unión','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Urumaco','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Zamora','MUNICIPIO',10),
	(nextval('lugar_lug_codigo_seq'), 'Camaguán','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Chaguaramas','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'El Socorro','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'José Félix Ribas','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'José Tadeo Monagas','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Juan Germán Roscio','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Julián Mellado','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Las Mercedes','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Leonardo Infante','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Pedro Zaraza','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Ortíz','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'San Gerónimo de Guayabal','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'San José de Guaribe','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Santa María de Ipire','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Sebastián Francisco de Miranda','MUNICIPIO',11),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Eloy Blanco','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Crespo','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Iribarren','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Jiménez','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Morán','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Palavecino','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Simón Planas','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Torres','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Urdaneta','MUNICIPIO',12),
	(nextval('lugar_lug_codigo_seq'), 'Alberto Adriani','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Bello','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Antonio Pinto Salinas','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Aricagua','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Arzobispo Chacón','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Campo Elías','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Caracciolo Parra Olmedo','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Cardenal Quintero','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Guaraque','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Julio César Salas','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Justo Briceño','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Miranda','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Obispo Ramos de Lora','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Padre Noguera','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Pueblo Llano','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Rangel','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Rivas Dávila','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Santos Marquina','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Tovar','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Tulio Febres Cordero','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Zea','MUNICIPIO',13),
	(nextval('lugar_lug_codigo_seq'), 'Acevedo','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Bello','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Baruta','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Brión','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Buroz','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Carrizal','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Chacao','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Cristóbal Rojas','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'El Hatillo','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Guaicaipuro','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Independencia','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Lander','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Los Salias','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Páez','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Paz Castillo','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Pedro Gual','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Plaza','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Simón Bolívar','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Urdaneta','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Zamora','MUNICIPIO',14),
	(nextval('lugar_lug_codigo_seq'), 'Acosta','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Aguasay','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Caripe','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Cedeño','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Ezequiel Zamora','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Maturín','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Piar','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Punceres','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Santa Bárbara','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Sotillo','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Uracoa','MUNICIPIO',15),
	(nextval('lugar_lug_codigo_seq'), 'Antolín del Campo','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Arismendi','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'García','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Gómez','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Maneiro','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Marcano','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Mariño','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Península de Macanao','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Tubores','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Villalba','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Díaz','MUNICIPIO',16),
	(nextval('lugar_lug_codigo_seq'), 'Agua Blanca','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Araure','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Esteller','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Guanare','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Guanarito','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Monseñor José Vicente de Unda','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Ospino','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Páez','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Papelón','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'San Genaro de Boconoíto','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'San Rafael de Onoto','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Santa Rosalía','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Turén','MUNICIPIO',17),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Eloy Blanco','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Mata','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Arismendi','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Benítez','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Bermúdez','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Cajigal','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Cruz Salmerón Acosta','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Mariño','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Mejía','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Montes','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Ribero','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Valdéz','MUNICIPIO',18),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Bello','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Antonio Rómulo Costa','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Ayacucho','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Cárdenas','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Córdoba','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Fernández Feo','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Francisco de Miranda','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'García de Hevia','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Guásimos','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Independencia','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Jáuregui','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'José María Vargas','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Junín','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Libertad','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Lobatera','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Michelena','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Panamericano','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Pedro María Ureña','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Rafael Urdaneta','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Samuel Darío Maldonado','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'San Cristóbal','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Seboruco','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Simón Rodríguez','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Torbes','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Uribante','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'San Judas Tadeo','MUNICIPIO',19),
	(nextval('lugar_lug_codigo_seq'), 'Andrés Bello','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Boconó','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Candelaria','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Carache','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Escuque','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'José Felipe Márquez Cañizalez','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Juan Vicente Campos Elías','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'La Ceiba','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Miranda','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Monte Carmelo','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Motatán','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Pampán','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Pampanito','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Rafael Rangel','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'San Rafael de Carvajal','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Trujillo','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Urdaneta','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Valera','MUNICIPIO',20),
	(nextval('lugar_lug_codigo_seq'), 'Vargas','MUNICIPIO',21),
	(nextval('lugar_lug_codigo_seq'), 'Arístides Bastidas','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Bolívar','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Bruzual','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Cocorote','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Independencia','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'José Antonio Páez','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'La Trinidad','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Manuel Monge','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Nirgua','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Peña','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'San Felipe','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Urachiche','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'José Joaquín Veroes','MUNICIPIO',22),
	(nextval('lugar_lug_codigo_seq'), 'Almirante Padilla','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Baralt','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Cabimas','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Catatumbo','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Colón','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Francisco Javier Pulgar','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Guajira','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Jesús Enrique Losada','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Jesús María Semprún','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'La Cañada de Urdaneta','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Lagunillas','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Machiques de Perijá','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Mara','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Maracaibo','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Miranda','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Rosario de Perijá','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'San Francisco','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Santa Rita','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Simón Bolívar','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'), 'Valmore Rodríguez','MUNICIPIO', 23),
	(nextval('lugar_lug_codigo_seq'),'Libertador', 'MUNICIPIO',24),


	(nextval('lugar_lug_codigo_seq'), 'Huachamacare','PARROQUIA',25),
	(nextval('lugar_lug_codigo_seq'), 'Marawaka ','PARROQUIA',25),
	(nextval('lugar_lug_codigo_seq'), 'Mavaca','PARROQUIA',25),
	(nextval('lugar_lug_codigo_seq'), 'Sierra Parima','PARROQUIA',25),
	(nextval('lugar_lug_codigo_seq'), 'La esmeralda','PARROQUIA',25),
	(nextval('lugar_lug_codigo_seq'), 'Ucata','PARROQUIA',26),
	(nextval('lugar_lug_codigo_seq'), 'Yapacana','PARROQUIA',26),
	(nextval('lugar_lug_codigo_seq'), 'Caname','PARROQUIA',26),
	(nextval('lugar_lug_codigo_seq'), 'Atabapo','PARROQUIA',26),
	(nextval('lugar_lug_codigo_seq'), 'Fernando Girón Tovar','PARROQUIA',27),
	(nextval('lugar_lug_codigo_seq'), 'Luis Alberto Gómez','PARROQUIA',27),
	(nextval('lugar_lug_codigo_seq'), 'Parhueña','PARROQUIA',27),
	(nextval('lugar_lug_codigo_seq'), 'Platanillal Platanillal','PARROQUIA',27),
	(nextval('lugar_lug_codigo_seq'), 'Samariapo','PARROQUIA',28),
	(nextval('lugar_lug_codigo_seq'), 'Sipapo','PARROQUIA',28),
	(nextval('lugar_lug_codigo_seq'), 'Munduapo','PARROQUIA',28),
	(nextval('lugar_lug_codigo_seq'), 'Guayapo','PARROQUIA',28),
	(nextval('lugar_lug_codigo_seq'), 'Alto Ventuari','PARROQUIA',29),
	(nextval('lugar_lug_codigo_seq'), 'Medio Ventuari','PARROQUIA',29),
	(nextval('lugar_lug_codigo_seq'), 'Bajo Ventuari','PARROQUIA',29),
	(nextval('lugar_lug_codigo_seq'), 'Victorino','PARROQUIA',30),
	(nextval('lugar_lug_codigo_seq'), 'Comunidad','PARROQUIA',30),
	(nextval('lugar_lug_codigo_seq'), 'Casiquiare','PARROQUIA',31),
	(nextval('lugar_lug_codigo_seq'), 'Cocuy','PARROQUIA',31),
	(nextval('lugar_lug_codigo_seq'), 'Solano','PARROQUIA',31),
	(nextval('lugar_lug_codigo_seq'), 'Anaco','PARROQUIA',32),
	(nextval('lugar_lug_codigo_seq'), 'San Joaquín','PARROQUIA',32),
	(nextval('lugar_lug_codigo_seq'), 'Cachipo','PARROQUIA',33),
	(nextval('lugar_lug_codigo_seq'), 'Aragua de Barcelona','PARROQUIA',33),
	(nextval('lugar_lug_codigo_seq'), 'Clarines','PARROQUIA',34),
	(nextval('lugar_lug_codigo_seq'), 'Guanape','PARROQUIA',34),
	(nextval('lugar_lug_codigo_seq'), 'Sabana de Uchire','PARROQUIA',34),
	(nextval('lugar_lug_codigo_seq'), 'Lechería','PARROQUIA',35),
	(nextval('lugar_lug_codigo_seq'), 'El Morro','PARROQUIA',35),
	(nextval('lugar_lug_codigo_seq'), 'Puerto Píritu','PARROQUIA',36),
	(nextval('lugar_lug_codigo_seq'), 'San Miguel','PARROQUIA',36),
	(nextval('lugar_lug_codigo_seq'), 'Sucre','PARROQUIA',36),
	(nextval('lugar_lug_codigo_seq'), 'Valle de Guanape','PARROQUIA',37),
	(nextval('lugar_lug_codigo_seq'), 'Santa Bárbara','PARROQUIA',37),
	(nextval('lugar_lug_codigo_seq'), 'El Chaparro','PARROQUIA',38),
	(nextval('lugar_lug_codigo_seq'), 'Tomás Alfaro','PARROQUIA',38),
	(nextval('lugar_lug_codigo_seq'), 'Calatrava','PARROQUIA',38),
	(nextval('lugar_lug_codigo_seq'), 'Guanta','PARROQUIA',39),
	(nextval('lugar_lug_codigo_seq'), 'Chorrerón','PARROQUIA',39),
	(nextval('lugar_lug_codigo_seq'), 'Mamo','PARROQUIA',40),
	(nextval('lugar_lug_codigo_seq'), 'Soledad','PARROQUIA',40),
	(nextval('lugar_lug_codigo_seq'), 'Mapire','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'Piar','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'Santa Clara','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'San Diego de Cabrutica','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'Uverito','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'Zuata','PARROQUIA',41),
	(nextval('lugar_lug_codigo_seq'), 'Puerto La Cruz','PARROQUIA',42),
	(nextval('lugar_lug_codigo_seq'), 'Pozuelos','PARROQUIA',42),
	(nextval('lugar_lug_codigo_seq'), 'Onoto','PARROQUIA',43),
	(nextval('lugar_lug_codigo_seq'), 'San Pablo','PARROQUIA',43),
	(nextval('lugar_lug_codigo_seq'), 'San Mateo','PARROQUIA',44),
	(nextval('lugar_lug_codigo_seq'), 'El Carito','PARROQUIA',44),
	(nextval('lugar_lug_codigo_seq'), 'Santa Inés','PARROQUIA',44),
	(nextval('lugar_lug_codigo_seq'), 'La Romereña','PARROQUIA',44),
	(nextval('lugar_lug_codigo_seq'), 'Atapirire','PARROQUIA',45),
	(nextval('lugar_lug_codigo_seq'), 'Boca del Pao','PARROQUIA',45),
	(nextval('lugar_lug_codigo_seq'), 'El Pao','PARROQUIA',45),
	(nextval('lugar_lug_codigo_seq'), 'Pariaguán','PARROQUIA',45),
	(nextval('lugar_lug_codigo_seq'), 'Cantaura','PARROQUIA',46),
	(nextval('lugar_lug_codigo_seq'), 'Libertador','PARROQUIA',46),
	(nextval('lugar_lug_codigo_seq'), 'Santa Rosa','PARROQUIA',46),
	(nextval('lugar_lug_codigo_seq'), 'Urica','PARROQUIA',46),
	(nextval('lugar_lug_codigo_seq'), 'Píritu','PARROQUIA',47),
	(nextval('lugar_lug_codigo_seq'), 'San Francisco','PARROQUIA',47),
	(nextval('lugar_lug_codigo_seq'), 'San José de Guanipa','PARROQUIA',48),
	(nextval('lugar_lug_codigo_seq'), 'Boca de Uchire','PARROQUIA',49),
	(nextval('lugar_lug_codigo_seq'), 'Boca de Chávez','PARROQUIA',49),
	(nextval('lugar_lug_codigo_seq'), 'Pueblo Nuevo','PARROQUIA',50),
	(nextval('lugar_lug_codigo_seq'), 'Santa Ana','PARROQUIA',50),
	(nextval('lugar_lug_codigo_seq'), 'Bergantín','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'Caigua','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'El Carmen','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'El Pilar','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'Naricual','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'San Crsitóbal','PARROQUIA',51),
	(nextval('lugar_lug_codigo_seq'), 'Edmundo Barrios','PARROQUIA',52),
	(nextval('lugar_lug_codigo_seq'), 'Miguel Otero Silva','PARROQUIA',52),
	(nextval('lugar_lug_codigo_seq'), 'Achaguas','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'Apurito','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'El Yagual','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'Guachara','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'Mucuritas','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'Queseras del medio','PARROQUIA',53),
	(nextval('lugar_lug_codigo_seq'), 'Biruaca','PARROQUIA',54),
	(nextval('lugar_lug_codigo_seq'), 'Bruzual','PARROQUIA',55),
	(nextval('lugar_lug_codigo_seq'), 'Mantecal','PARROQUIA',55),
	(nextval('lugar_lug_codigo_seq'), 'Quintero','PARROQUIA',55),
	(nextval('lugar_lug_codigo_seq'), 'Rincón Hondo','PARROQUIA',55),
	(nextval('lugar_lug_codigo_seq'), 'San Vicente','PARROQUIA',55),
	(nextval('lugar_lug_codigo_seq'), 'Guasdualito','PARROQUIA',56),
	(nextval('lugar_lug_codigo_seq'), 'Aramendi','PARROQUIA',56),
	(nextval('lugar_lug_codigo_seq'), 'El Amparo','PARROQUIA',56),
	(nextval('lugar_lug_codigo_seq'), 'San Camilo','PARROQUIA',56),
	(nextval('lugar_lug_codigo_seq'), 'Urdaneta','PARROQUIA',56),
	(nextval('lugar_lug_codigo_seq'), 'San Juan de Payara','PARROQUIA',57),
	(nextval('lugar_lug_codigo_seq'), 'Codazzi','PARROQUIA',57),
	(nextval('lugar_lug_codigo_seq'), 'Cunaviche','PARROQUIA',57),
	(nextval('lugar_lug_codigo_seq'), 'Elorza','PARROQUIA',58),
	(nextval('lugar_lug_codigo_seq'), 'La Trinidad','PARROQUIA',58),
	(nextval('lugar_lug_codigo_seq'), 'San Fernando','PARROQUIA',59),
	(nextval('lugar_lug_codigo_seq'), 'El Recreo','PARROQUIA',59),
	(nextval('lugar_lug_codigo_seq'), 'Peñalver','PARROQUIA',59),
	(nextval('lugar_lug_codigo_seq'), 'San Rafael de Atamaica','PARROQUIA',59);

	INSERT INTO lugar(
	lug_codigo, lug_tipo, fk_lug_lugar,lug_nombre)
	VALUES
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Pedro José Ovalles'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Joaquín Crespo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'José Casanova Godoy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Madre María de San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Andrés Eloy Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Los Tacarigua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Las Delicias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 60, 'Choroní'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 61, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 62, 'Camatagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 62, 'Carmen de Cura'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 63, 'Santa Rita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 63, 'Francisco de Miranda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 63, 'Moseñor Feliciano González'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 64, 'Santa Cruz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 65, 'José Félix Ribas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 65, 'Castor Nieves Ríos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 65, 'Las Guacamayas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 65, 'Pao de Zárate'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 65, 'Zuata'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 66, 'José Rafael Revenga'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 67, 'Palo Negro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 67, 'San Martín de Porres'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 68, 'El Limón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 68, 'Caña de Azúcar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 69, 'Ocumare de la Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 70, 'San Casimiro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 70, 'Güiripa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 70, 'Ollas de Caramacate'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 70, 'Valle Morín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 71, 'San Sebastían'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 72, 'Turmero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 72, 'Arevalo Aponte'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 72, 'Chuao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 72, 'Samán de Güere'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 72, 'Alfredo Pacheco Miranda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 73, 'Santos Michelena'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 73, 'Tiara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 74, 'Cagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 74, 'Bella Vista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 75, 'Tovar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 76, 'Urdaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 76, 'Las Peñitas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 76, 'San Francisco de Cara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 76, 'Taguay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 77, 'Zamora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 77, 'Magdaleno'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 77, 'San Francisco de Asís'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 77, 'Valles de Tucutunemo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 77, 'Augusto Mijares'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 78, 'Sabaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 78, 'Juan Antonio Rodríguez Domínguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 79, 'El Cantón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 79, 'Santa Cruz de Guacas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 79, 'Puerto Vivas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 80, 'Ticoporo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 80, 'Nicolás Pulido'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 80, 'Andrés Bello'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 81, 'Arismendi'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 81, 'Guadarrama'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 81, 'La Unión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 81, 'San Antonio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Barinas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Alberto Arvelo Larriva'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'San Silvestre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Santa Inés'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Santa Lucía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Torumos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'El Carmen'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Rómulo Betancourt'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Corazón de Jesús'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Ramón Ignacio Méndez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Alto Barinas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Manuel Palacio Fajardo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Juan Antonio Rodríguez Domínguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 82, 'Dominga Ortiz de Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 83, 'Barinitas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 83, 'Altamira de Cáceres'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 83, 'Calderas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 84, 'Barrancas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 84, 'El Socorro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 84, 'Mazparrito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 85, 'Santa Bárbara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 85, 'Pedro Briceño Méndez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 85, 'Ramón Ignacio Méndez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 85, 'José Ignacio del Pumar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 86, 'Obispos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 86, 'Guasimitos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 86, 'El Real'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 86, 'La Luz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 87, 'Ciudad Bolívia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 87, 'José Ignacio Briceño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 87, 'José Félix Ribas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 87, 'Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 88, 'Libertad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 88, 'Dolores'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 88, 'Santa Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 88, 'Palacio Fajardo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 89, 'Ciudad de Nutrias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 89, 'El Regalo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 89, 'Puerto Nutrias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 89, 'Santa Catalina'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Cachamay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Chirica'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Dalla Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Once de Abril'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Simón Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Unare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Universidad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Vista al Sol'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Pozo Verde'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, 'Yocoima'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 90, '5 de Julio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'Cedeño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'Altagracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'Ascensión Farreras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'Guaniamo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'La Urbana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 91, 'Pijiguaos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 92, 'El Callao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 93, 'Gran Sabana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 93, 'Ikabarú'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Catedral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Zea'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Orinoco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'José Antonio Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Marhuanta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Agua Salada'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Vista Hermosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'La Sabanita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 94, 'Panapana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 95, 'Andrés Eloy Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 95, 'Pedro Cova'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 96, 'Raúl Leoni'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 96, 'Barceloneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 96, 'Santa Bárbara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 96, 'San Francisco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 97, 'Roscio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 97, 'Salóm'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 98, 'Sifontes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 98, 'Dalla Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 98, 'San Isidro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 99, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 99, 'Aripao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 99, 'Guarataro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 99, 'Las Majadas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 99, 'Moitaco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 100, 'Padre Pedro Chien'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 100, 'Río Grande'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 101, 'Bejuma'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 101, 'Canoabo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 101, 'Simón Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 102, 'Güigüe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 102, 'Carabobo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 102, 'Tacarigua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 103, 'Mariara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 103, 'Aguas Calientes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 104, 'Ciudad Alianza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 104, 'Guacara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 104, 'Yagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 105, 'Morón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 105, 'Yagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 106, 'Tocuyito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 106, 'Independencia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 107, 'Los Guayos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 108, 'Miranda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 109, 'Montalbán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 110, 'Naguanagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Bartolomé Salóm'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Democracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Fraternidad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Goaigoaza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Juan José Flores'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Unión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Borburata'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 111, 'Patanemo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 112, 'San Diego'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 113, 'San Joaquín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Candelaria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Catedral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'El Socorro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Miguel Peña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Rafael Urdaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'San Blas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Santa Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 114, 'Negro Primero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 115, 'Cojedes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 115, 'Juan de Mata Suárez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 116, 'Tinaquillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 117, 'El Baúl'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 117, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 118, 'La Aguadita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 118, 'Macapo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 119, 'El Pao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 120, 'El Amparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 120, 'Libertad de Cojedes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 121, 'Rómulo Gallegos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 122, 'San Carlos de Austria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 122, 'Juan Ángel Bravo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 122, 'Manuel Manrique'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 123, 'General en Jefe José Laurencio Silva'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Curiapo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Almirante Luis Brión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Francisco Aniceto Lugo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Manuel Renaud'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Padre Barral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 124, 'Santos de Abelgas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 125, 'Imataca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 125, 'Cinco de Julio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 125, 'Juan Bautista Arismendi'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 125, 'Manuel Piar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 125, 'Rómulo Gallegos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 126, 'Pedernales'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 126, 'Luis Beltrán Prieto Figueroa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'San José (Delta Amacuro)'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'José Vidal Marcano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'Juan Millán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'Leonardo Ruíz Pineda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'Mariscal Antonio José de Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'Monseñor Argimiro García'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'San Rafael (Delta Amacuro)'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 127, 'Virgen del Valle'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 128, 'Capadare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 128, 'La Pastora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 128, 'Libertador'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 128, 'San Juan de los Cayos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 129, 'Aracua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 129, 'La Peña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 129, 'San Luis'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Bariro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Borojó'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Capatárida'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Guajiro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Seque'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Zazárida'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 130, 'Valle de Eroa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 131, 'Cacique Manaure'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 132, 'Norte'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 132, 'Carirubana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 132, 'Santa Ana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 132, 'Urbana Punta Cardón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 133, 'La Vela de Coro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 133, 'Acurigua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 133, 'Guaibacoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 133, 'Las Calderas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 133, 'Macoruca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 134, 'Dabajuro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 135, 'Agua Clara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 135, 'Avaria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 135, 'Pedregal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 135, 'Piedra Grande'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 135, 'Purureche'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Adaure'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Adícora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Baraived'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Buena Vista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Jadacaquiva'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'El Vínculo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'El Hato'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Moruy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 136, 'Pueblo Nuevo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 137, 'Agua Larga'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 137, 'El Paují'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 137, 'Independencia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 137, 'Mapararí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 137, 'Churuguara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 138, 'Agua Linda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 138, 'Araurima'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 138, 'Jacura'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 139, 'Tucacas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 139, 'Boca de Aroa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 140, 'Los Taques'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 140, 'Judibana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 141, 'Mene de Mauroa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 141, 'San Félix'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 141, 'Casigua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'Guzmán Guillermo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'Mitare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'Río Seco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'Sabaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'San Antonio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'San Gabriel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 142, 'Santa Ana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 143, 'Boca del Tocuyo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 143, 'Chichiriviche'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 143, 'Tocuyo de la Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 144, 'Palmasola'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 145, 'Cabure'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 145, 'Colina'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 145, 'Curimagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 146, 'San José de la Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 146, 'Píritu'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 147, 'San Francisco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 148, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 148, 'Pecaya'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 149, 'Tocópero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 150, 'El Charal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 150, 'Las Vegas del Tuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 150, 'Santa Cruz de Bucaral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 151, 'Bruzual'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 151, 'Urumaco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 152, 'Puerto Cumarebo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 152, 'La Ciénaga'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 152, 'La Soledad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 152, 'Pueblo Cumarebo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 152, 'Zazárida'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 153, 'Camaguán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 153, 'Puerto Miranda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 153, 'Uverito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 154, 'Chaguaramas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 155, 'El Socorro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 156, 'Tucupido'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 156, 'San Rafael de Laya'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'Altagracia de Orituco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'San Rafael de Orituco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'San Francisco Javier de Lezama'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'Paso Real de Macaira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'Carlos Soublette'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'San Francisco de Macaira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 157, 'Libertad de Orituco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 158, 'Cantaclaro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 158, 'San Juan de los Morros'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 158, 'Parapara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 159, 'El Sombrero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 159, 'Sosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 160, 'Las Mercedes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 160, 'Cabruta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 160, 'Santa Rita de Manapire'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 161, 'Valle de la Pascua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 161, 'Espino'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 162, 'San José de Unare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 162, 'Zaraza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 163, 'San José de Tiznados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 163, 'San Francisco de Tiznados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 163, 'San Lorenzo de Tiznados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 163, 'Ortiz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 164, 'Guayabal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 164, 'Cazorla'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 165, 'San José de Guaribe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 165, 'Uveral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 166, 'Santa María de Ipire'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 166, 'Altamira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 167, 'El Calvario'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 167, 'El Rastro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 167, 'Guardatinajas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 167, 'Capital Urbana Calabozo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 168, 'Quebrada Honda de Guache'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 168, 'Pío Tamayo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 168, 'Yacambú'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 169, 'Fréitez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 169, 'José María Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Catedral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'El Cují'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Juan de Villegas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Santa Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Tamaca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Unión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Aguedo Felipe Alvarado'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Buena Vista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 170, 'Juárez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Juan Bautista Rodríguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Cuara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Diego de Lozada'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Paraíso de San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'San Miguel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Tintorero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'José Bernardo Dorante'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 171, 'Coronel Mariano Peraza '),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Anzoátegui'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Guarico'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Hilario Luna y Luna'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Humocaro Alto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Humocaro Bajo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'La Candelaria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 172, 'Morán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 173, 'Cabudare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 173, 'José Gregorio Bastidas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 173, 'Agua Viva'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 174, 'Sarare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 174, 'Buría'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 174, 'Gustavo Vegas León'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Trinidad Samuel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Antonio Díaz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Camacaro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Castañeda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Cecilio Zubillaga'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Chiquinquirá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'El Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Espinoza de los Monteros'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Lara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Las Mercedes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Manuel Morillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Montaña Verde'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Montes de Oca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Torres'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Heriberto Arroyo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Reyes Vargas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 175, 'Altagracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 176, 'Siquisique'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 176, 'Moroturo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 176, 'San Miguel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 176, 'Xaguas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Presidente Betancourt'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Presidente Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Presidente Rómulo Gallegos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Gabriel Picón González'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Héctor Amable Mora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'José Nucete Sardi'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 177, 'Pulido Méndez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 178, 'La Azulita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 179, 'Santa Cruz de Mora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 179, 'Mesa Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 179, 'Mesa de Las Palmas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 180, 'Aricagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 180, 'San Antonio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Canagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Capurí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Chacantá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'El Molino'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Guaimaral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Mucutuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 181, 'Mucuchachí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'Fernández Peña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'Matriz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'Montalbán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'Acequias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'Jají'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'La Mesa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 182, 'San José del Sur'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 183, 'Tucaní'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 183, 'Florencio Ramírez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 184, 'Santo Domingo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 184, 'Las Piedras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 185, 'Guaraque'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 185, 'Mesa de Quintero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 185, 'Río Negro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 186, 'Arapuey'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 186, 'Palmira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 187, 'San Cristóbal de Torondoy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 187, 'Torondoy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Antonio Spinetti Dini'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Arias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Caracciolo Parra Pérez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Domingo Peña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'El Llano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Gonzalo Picón Febres'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Jacinto Plaza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Juan Rodríguez Suárez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Lasso de la Vega'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Mariano Picón Salas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Milla'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Osuna Rodríguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Sagrario'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'El Morro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 188, 'Los Nevados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 189, 'Andrés Eloy Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 189, 'La Venta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 189, 'Piñango'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 189, 'Timotes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 190, 'Eloy Paredes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 190, 'San Rafael de Alcázar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 190, 'Santa Elena de Arenales'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 191, 'Santa María de Caparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 192, 'Pueblo Llano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 193, 'Cacute'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 193, 'La Toma'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 193, 'Mucuchíes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 193, 'Mucurubá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 193, 'San Rafael'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 194, 'Gerónimo Maldonado'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 194, 'Bailadores'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 195, 'Tabay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'Chiguará'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'Estánquez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'Lagunillas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'La Trampa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'Pueblo Nuevo del Sur'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 196, 'San Juan'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 197, 'El Amparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 197, 'El Llano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 197, 'San Francisco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 197, 'Tovar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 198, 'Independencia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 198, 'María de la Concepción Palacios Blanco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 198, 'Nueva Bolivia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 198, 'Santa Apolonia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 199, 'Caño El Tigre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 199, 'Zea'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Aragüita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Arévalo González'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Capaya'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Caucagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Panaquire'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Ribas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'El Café'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 200, 'Marizapa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 201, 'Cumbo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 201, 'San José de Barlovento'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 202, 'El Cafetal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 202, 'Las Minas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 202, 'Nuestra Señora del Rosario'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 203, 'Higuerote'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 203, 'Curiepe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 203, 'Tacarigua de Brión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 204, 'Mamporal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 205, 'Carrizal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 206, 'Chacao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 207, 'Charallave'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 207, 'Las Brisas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 208, 'El Hatillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'Altagracia de la Montaña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'Cecilio Acosta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'Los Teques'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'El Jarillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'San Pedro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'Tácata'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 209, 'Paracotos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 210, 'Cartanal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 210, 'Santa Teresa del Tuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 211, 'La Democracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 211, 'Ocumare del Tuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 211, 'Santa Bárbara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 212, 'San Antonio de los Altos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 213, 'Río Chico'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 213, 'El Guapo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 213, 'Tacarigua de la Laguna'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 213, 'Paparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 213, 'San Fernando del Guapo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 214, 'Santa Lucía del Tuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 215, 'Cúpira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 215, 'Machurucuto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 216, 'Guarenas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 217, 'San Antonio de Yare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 217, 'San Francisco de Yare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 218, 'Leoncio Martínez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 218, 'Petare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 218, 'Caucagüita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 218, 'Filas de Mariche'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 218, 'La Dolorita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 219, 'Cúa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 219, 'Nueva Cúa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 220, 'Guatire'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 220, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 221, 'San Antonio de Maturín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 221, 'San Francisco de Maturín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 222, 'Aguasay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 223, 'Caripito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'El Guácharo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'La Guanota'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'Sabana de Piedra'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'San Agustín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'Teresen'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 224, 'Caripe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 225, 'Areo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 225, 'Capital Cedeño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 225, 'San Félix de Cantalicio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 225, 'Viento Fresco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 226, 'El Tejero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 226, 'Punta de Mata'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 227, 'Chaguaramas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 227, 'Las Alhuacas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 227, 'Tabasca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 227, 'Temblador'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'Alto de los Godos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'Boquerón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'Las Cocuizas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'La Cruz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'San Simón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'El Corozo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'El Furrial'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'Jusepín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'La Pica'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 228, 'San Vicente'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'Aparicio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'Aragua de Maturín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'Chaguamal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'El Pinto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'Guanaguana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'La Toscana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 229, 'Taguaya'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 230, 'Cachipo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 230, 'Quiriquire'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 231, 'Santa Bárbara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 232, 'Barrancas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 232, 'Los Barrancos de Fajardo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 233, 'Uracoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 234, 'Antolín del Campo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 235, 'Arismendi'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 236, 'García'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 236, 'Francisco Fajardo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 237, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 237, 'Guevara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 237, 'Matasiete'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 237, 'Santa Ana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 237, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 238, 'Aguirre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 238, 'Maneiro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 239, 'Adrián'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 239, 'Juan Griego'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 239, 'Yaguaraparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 240, 'Porlamar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 241, 'San Francisco de Macanao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 241, 'Boca de Río'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 242, 'Tubores'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 242, 'Los Baleales'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 243, 'Vicente Fuentes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 243, 'Villalba'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 244, 'San Juan Bautista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 244, 'Zabala'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 245, 'Agua Blanca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 246, 'Capital Araure'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 246, 'Río Acarigua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 247, 'Capital Esteller'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 247, 'Uveral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 248, 'Guanare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 248, 'Córdoba'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 248, 'San José de la Montaña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 248, 'San Juan de Guanaguanare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 248, 'Virgen de la Coromoto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 249, 'Guanarito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 249, 'Trinidad de la Capilla'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 249, 'Divina Pastora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 250, 'Monseñor José Vicente de Unda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 250, 'Peña Blanca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 251, 'Capital Ospino'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 251, 'Aparición'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 251, 'La Estación'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 252, 'Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 252, 'Payara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 252, 'Pimpinela'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 252, 'Ramón Peraza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 253, 'Papelón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 253, 'Caño Delgadito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 254, 'San Genaro de Boconoito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 254, 'Antolín Tovar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 255, 'San Rafael de Onoto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 255, 'Santa Fe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 255, 'Thermo Morles'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 256, 'Santa Rosalía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 256, 'Florida'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'San Rafael de Palo Alzado'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'Uvencio Antonio Velásquez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'San José de Saguaz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 257, 'Villa Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 258, 'Turén'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 258, 'Canelones'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 258, 'Santa Cruz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 258, 'San Isidro Labrador'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 259, 'Mariño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 259, 'Rómulo Gallegos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 260, 'San José de Aerocuar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 260, 'Tavera Acosta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 261, 'Río Caribe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 261, 'Antonio José de Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 261, 'El Morro de Puerto Santo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 261, 'Puerto Santo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 261, 'San Juan de las Galdonas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'El Pilar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'El Rincón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'General Francisco Antonio Váquez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'Guaraúnos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'Tunapuicito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 262, 'Unión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 263, 'Santa Catalina'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 263, 'Santa Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 263, 'Santa Teresa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 263, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 263, 'Maracapana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 265, 'Libertad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 265, 'El Paujil'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 265, 'Yaguaraparo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 266, 'Cruz Salmerón Acosta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 266, 'Chacopata'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 266, 'Manicuare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 267, 'Tunapuy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 267, 'Campo Elías'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 268, 'Irapa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 268, 'Campo Claro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 268, 'Maraval'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 268, 'San Antonio de Irapa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 268, 'Soro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 269, 'Mejía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'Cumanacoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'Arenas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'Aricagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'Cogollar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'San Fernando'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 270, 'San Lorenzo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 271, 'Villa Frontado (Muelle de Cariaco)'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 271, 'Catuaro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 271, 'Rendón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 271, 'San Cruz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 271, 'Santa María'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Altagracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Santa Inés'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Valentín Valiente'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Ayacucho'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'San Juan'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Raúl Leoni'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 272, 'Gran Mariscal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 273, 'Cristóbal Colón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 273, 'Bideau'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 273, 'Punta de Piedras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 273, 'Güiria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 274, 'Andrés Bello'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 275, 'Antonio Rómulo Costa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 276, 'Ayacucho'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 276, 'Rivas Berti'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 276, 'San Pedro del Río'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 277, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 277, 'Palotal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 277, 'General Juan Vicente Gómez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 277, 'Isaías Medina Angarita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 278, 'Cárdenas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 278, 'Amenodoro Ángel Lamus'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 278, 'La Florida'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 279, 'Córdoba'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 280, 'Fernández Feo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 280, 'Alberto Adriani'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 280, 'Santo Domingo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 281, 'Francisco de Miranda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 282, 'García de Hevia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 282, 'Boca de Grita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 282, 'José Antonio Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 283, 'Guásimos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 284, 'Independencia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 284, 'Juan Germán Roscio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 284, 'Román Cárdenas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 285, 'Jáuregui'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 285, 'Emilio Constantino Guerrero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 285, 'Monseñor Miguel Antonio Salas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 286, 'José María Vargas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 287, 'Junín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 287, 'La Petrólea'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 287, 'Quinimarí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 287, 'Bramón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 288, 'Libertad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 288, 'Cipriano Castro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 288, 'Manuel Felipe Rugeles'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 289, 'Libertador'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 289, 'Doradas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 289, 'Emeterio Ochoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 289, 'San Joaquín de Navay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 290, 'Lobatera'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 290, 'Constitución'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 291, 'Michelena'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 292, 'Panamericano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 292, 'La Palmita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 293, 'Pedro María Ureña'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 293, 'Nueva Arcadia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 294, 'Delicias'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 294, 'Pecaya'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 295, 'Samuel Darío Maldonado'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 295, 'Boconó'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 295, 'Hernández'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 296, 'La Concordia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 296, 'San Juan Bautista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 296, 'Pedro María Morantes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 296, 'San Sebastián'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 296, 'Dr. Francisco Romero Lobo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 297, 'Seboruco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 298, 'Simón Rodríguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 299, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 299, 'Eleazar López Contreras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 299, 'San Pablo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 300, 'Torbes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 301, 'Uribante'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 301, 'Cárdenas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 301, 'Juan Pablo Peñalosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 301, 'Potosí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 302, 'San Judas Tadeo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 303, 'Araguaney'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 303, 'El Jaguito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 303, 'La Esperanza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 303, 'Santa Isabel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Boconó'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'El Carmen'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Mosquey'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Ayacucho'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Burbusay'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'General Ribas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Guaramacal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Vega de Guaramacal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Monseñor Jáuregui'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'Rafael Rangel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'San Miguel'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 304, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 305, 'Sabana Grande'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 305, 'Cheregüé'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 305, 'Granados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Arnoldo Gabaldón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Bolivia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Carrillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Cegarra'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Chejendé'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'Manuel Salvador Ulloa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 306, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 307, 'Carache'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 307, 'La Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 307, 'Cuicas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 307, 'Panamericana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 307, 'Santa Cruz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 308, 'Escuque'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 308, 'La Unión'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 308, 'Santa Rita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 308, 'Sabana Libre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 309, 'El Socorro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 309, 'Los Caprichos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 309, 'Antonio José de Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 310, 'Campo Elías'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 310, 'Arnoldo Gabaldón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 311, 'Santa Apolonia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 311, 'El Progreso'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 311, 'La Ceiba'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 311, 'Tres de Febrero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 312, 'El Dividive'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 312, 'Agua Santa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 312, 'Agua Caliente'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 312, 'El Cenizo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 312, 'Valerita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 313, 'Monte Carmelo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 313, 'Buena Vista'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 313, 'Santa María del Horcón'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 314, 'Motatán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 314, 'El Baño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 314, 'Jalisco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 315, 'Pampán'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 315, 'Flor de Patria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 315, 'La Paz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 315, 'Santa Ana'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 316, 'Pampanito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 316, 'La Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 316, 'Pampanito II'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 317, 'Betijoque'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 317, 'José Gregorio Hernández'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 317, 'La Pueblita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 317, 'Los Cedros'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 318, 'Carvajal'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 318, 'Campo Alegre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 318, 'Antonio Nicolás Briceño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 318, 'José Leonardo Suárez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 319, 'Sabana de Mendoza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 319, 'Junín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 319, 'Valmore Rodríguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 319, 'El Paraíso'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Andrés Linares'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Chiquinquirá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Cristóbal Mendoza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Cruz Carrillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Matriz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Monseñor Carrillo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 320, 'Tres Esquinas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'Cabimbú'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'Jajó'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'La Mesa de Esnujaque'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'Santiago'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'Tuñame'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 321, 'La Quebrada'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'Juan Ignacio Montilla'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'La Beatriz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'La Puerta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'Mendoza del Valle de Momboy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'Mercedes Díaz'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 322, 'San Luis'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Caraballeda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Carayaca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Carlos Soublette'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Caruao Chuspa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Catia La Mar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'El Junko'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'La Guaira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Macuto'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Maiquetía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Naiguatá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 323, 'Urimare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 324, 'Arístides Bastidas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 325, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 326, 'Chivacoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 326, 'Campo Elías'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 327, 'Cocorote'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 328, 'Independencia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 329, 'José Antonio Páez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 330, 'La Trinidad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 331, 'Manuel Monge'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 332, 'Salóm'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 332, 'Temerla'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 332, 'Nirgua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 333, 'San Andrés'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 333, 'Yaritagua'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 334, 'San Javier'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 334, 'Albarico'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 334, 'San Felipe'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 335, 'Sucre'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 336, 'Urachiche'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 337, 'El Guayabo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 337, 'Farriar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 338, 'Isla de Toas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 338, 'Monagas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'San Timoteo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'General Urdaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'Libertador'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'Marcelino Briceño'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'Pueblo Nuevo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 339, 'Manuel Guanipa Matos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Ambrosio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Carmen Herrera'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'La Rosa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Germán Ríos Linares'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'San Benito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Rómulo Betancourt'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Jorge Hernández'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Punta Gorda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 340, 'Arístides Calvani'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 341, 'Encontrados'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 341, 'Udón Pérez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 342, 'Moralito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 342, 'San Carlos del Zulia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 342, 'Santa Cruz del Zulia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 342, 'Santa Bárbara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 342, 'Urribarrí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 343, 'Carlos Quevedo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 343, 'Francisco Javier Pulgar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 343, 'Simón Rodríguez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 343, 'Guamo-Gavilanes'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 344, 'Sinamaica'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 344, 'Alta Guajira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 344, 'Elías Sánchez Rubio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 344, 'Guajira'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 345, 'La Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 345, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 345, 'Mariano Parra León'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 345, 'José Ramón Yépez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 346, 'Jesús María Semprún'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 346, 'Barí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 347, 'Concepción'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 347, 'Andrés Bello'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 347, 'Chiquinquirá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 347, 'El Carmelo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 347, 'Potreritos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 348, 'Libertad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 348, 'Alonso de Ojeda'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 348, 'Venezuela'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 348, 'Eleazar López Contreras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 348, 'Campo Lara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 349, 'Bartolomé de las Casas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 349, 'Libertad'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 349, 'Río Negro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 349, 'San José de Perijá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'San Rafael'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'La Sierrita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'Las Parcelas'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'Luis de Vicente'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'Monseñor Marcos Sergio Godoy'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'Ricaurte'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 350, 'Tamare'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Antonio Borjas Romero'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Bolívar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Cacique Mara'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Carracciolo Parra Pérez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Cecilio Acosta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Cristo de Aranza'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Coquivacoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Chiquinquirá'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Francisco Eugenio Bustamante'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Idelfonzo Vásquez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Juana de Ávila'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Luis Hurtado Higuera'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Manuel Dagnino'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Olegario Villalobos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Raúl Leoni'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Santa Lucía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'Venancio Pulgar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 351, 'San Isidro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 352, 'Altagracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 352, 'Faría'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 352, 'Ana María Campos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 352, 'San Antonio'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 352, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 353, 'Donaldo García'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 353, 'El Rosario'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 353, 'Sixto Zambrano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'San Francisco'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'El Bajo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'Domitila Flores'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'Francisco Ochoa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'Los Cortijos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 354, 'Marcial Hernández'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 355, 'Santa Rita'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 355, 'El Mene'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 355, 'Pedro Lucas Urribarrí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 355, 'José Cenobio Urribarrí'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 356, 'Rafael Maria Baralt'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 356, 'Manuel Manrique'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 356, 'Rafael Urdaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'Bobures'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'Gibraltar'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'Heras'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'Monseñor Arturo Álvarez'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'Rómulo Gallegos'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 357, 'El Batey'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 358, 'Rafael Urdaneta'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 358, 'La Victoria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 358, 'Raúl Cuenca'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Altagracia'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Antímano'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Caricuao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Catedral'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Coche'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'El Junquito'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'El Paraíso'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'El Recreo'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'El Valle'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'La Candelaria'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'La Pastora'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'La Vega'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Macarao'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'San Agustín'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'San Bernardino'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'San José'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'San Juan'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'San Pedro'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Santa Rosalía'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Santa Teresa'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, 'Sucre (Catia)'),
	(nextval('lugar_lug_codigo_seq'), 'PARROQUIA', 359, '23 de enero');

	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Jefe');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Subjefe');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Supervisor de campo');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Geólogo');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Portamira');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Ayudante de campaña');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Muestrero');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Chofer');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Cocinero');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Técnico supervisor');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Perforista');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Auxiliar de campo');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Ingeniero');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Economista');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Consultor');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Psicólogo');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Obrero');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Dibujante');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Secretario');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Topógrafo');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Geólogo especialista');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Contador');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Ejecutor de trinchera');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Analista de laboratorio');
	INSERT INTO CARGO (CAR_NOMBRE) VALUES ('Fotografo');


	INSERT INTO rol(
	rol_codigo, rol_nombre)
	VALUES 
	(nextval ('rol_rol_codigo_seq'), 'ADMINISTRADOR'),
	(nextval ('rol_rol_codigo_seq'), 'VENDEDOR'),
	(nextval ('rol_rol_codigo_seq'), 'RH'),
	(nextval ('rol_rol_codigo_seq'), 'ESPECIALISTA'),
	(nextval ('rol_rol_codigo_seq'), 'GESTOR');

	INSERT INTO privilegio(
	pri_codigo, pri_nombre)
	VALUES 
	(nextval('privilegio_pri_codigo_seq'), 'CAJA'),
	(nextval('privilegio_pri_codigo_seq'), 'PERSONAL'),
	(nextval('privilegio_pri_codigo_seq'), 'PROYECTOS'),
	(nextval('privilegio_pri_codigo_seq'), 'GESTION');

	INSERT INTO rol_pri(
	rp_codigo, fk_rp_rol, fk_rp_privilegio)
	VALUES 
	(nextval('rol_pri_rp_codigo_seq'), 1, 1),
	(nextval('rol_pri_rp_codigo_seq'), 1, 2),
	(nextval('rol_pri_rp_codigo_seq'), 1, 3),
	(nextval('rol_pri_rp_codigo_seq'), 1, 4),
	(nextval('rol_pri_rp_codigo_seq'), 2, 1),
	(nextval('rol_pri_rp_codigo_seq'), 3, 2),
	(nextval('rol_pri_rp_codigo_seq'), 4, 3),
	(nextval('rol_pri_rp_codigo_seq'), 5, 4);

	INSERT INTO EMPLEADO (EMP_CEDULA,EMP_NOMBRE,EMP_APELLIDO,EMP_FECHANACIMIENTO,EMP_GENERO,EMP_TELEFONO,FK_EMP_CARGO,FK_EMP_LUGAR) 
	VALUES (26530119,'Miguel','Apellido','1998-04-03','M',4242855585,1,1470);
	INSERT INTO EMPLEADO (EMP_CEDULA,EMP_NOMBRE,EMP_APELLIDO,EMP_FECHANACIMIENTO,EMP_GENERO,EMP_TELEFONO,FK_EMP_CARGO,FK_EMP_LUGAR) 
	VALUES (26530117,'Antonio','Alberto','1998-04-03','M',4242855585,1,1470);
	INSERT INTO EMPLEADO (EMP_CEDULA,EMP_NOMBRE,EMP_APELLIDO,EMP_FECHANACIMIENTO,EMP_GENERO,EMP_TELEFONO,FK_EMP_CARGO,FK_EMP_LUGAR) 
	VALUES (26530118,'Jesus','Chang','1998-04-03','M',4242855585,1,1470);
	INSERT INTO EMPLEADO (EMP_CEDULA,EMP_NOMBRE,EMP_APELLIDO,EMP_FECHANACIMIENTO,EMP_GENERO,EMP_TELEFONO,FK_EMP_CARGO,FK_EMP_LUGAR) 
	VALUES (26530120,'Alex','Loro','1998-04-03','M',4242855585,1,1470);

	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21581939,'Brett','Stephens','1993-02-02','M','4241484768',2,768),(13579621,'Simon','Mclean','1993-03-18','M','4246271427',7,411),(21241238,'Armand','Cummings','1969-05-18','M','4241268875',1,1321),(24906978,'Kelly','Kline','1995-09-20','M','4245094798',7,978),(19774717,'Tyler','Clay','1963-06-06','M','4241185186',6,863);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21462771,'Hayden','Diaz','1974-02-26','M','4246387144',2,1152),(22451913,'Hyatt','Leach','1975-12-06','M','4243374903',3,596),(11708061,'Arden','Rutledge','1966-03-28','M','4241091382',5,1147),(25468025,'Vernon','Cardenas','1973-09-07','M','4242132466',6,774),(21197410,'Baxter','Aguirre','1972-04-09','M','4242849903',7,1218);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12035119,'Lars','Curry','1973-10-31','M','4246072869',1,1162),(16443308,'Baker','Allison','1985-05-13','M','4248902386',7,1322),(11997017,'Stuart','Soto','1994-02-01','M','4247817393',7,478),(23649003,'Jasper','Macias','1967-02-21','M','4245219341',5,1372),(18575440,'Carl','Glass','1986-10-14','M','4248288861',4,764);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17274300,'Dorian','Scott','1967-10-09','M','4242278643',6,360),(18461790,'Norman','Robbins','1986-05-10','M','4249249749',4,1433),(20243157,'Oren','Chandler','1961-07-02','M','4247364331',2,1175),(24696038,'Gregory','Wong','1971-11-02','M','4243833684',4,520),(13061159,'Price','Delacruz','1969-01-10','M','4244846326',3,1398);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21839011,'Tyrone','Mcgowan','1989-11-05','M','4242251424',5,1223),(20438671,'Drake','Vinson','1990-07-28','M','4245346453',5,1462),(18689327,'Carlos','Lewis','1967-01-17','M','4243399096',1,670),(18280596,'Samuel','Joyner','1990-03-20','M','4249742088',5,1268),(21605265,'Stuart','Herrera','1964-09-05','M','4246152050',3,934);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23603171,'Graham','Robles','1990-12-30','M','4244332833',4,1400),(22285267,'Hashim','Phelps','1971-09-12','M','4245528736',5,1146),(12593643,'Kermit','Pena','1997-12-23','M','4241568138',1,666),(25673501,'Wing','Yang','1961-06-04','M','4248776260',2,1486),(17896357,'Fletcher','Gates','1966-08-29','M','4248051935',1,1261);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21875608,'Brenden','Long','1963-07-02','M','4242577594',4,578),(13953243,'Thomas','Short','1994-04-22','M','4246659690',3,1018),(19510695,'Chester','Bass','1975-01-18','M','4241332019',5,1339),(21410705,'Wing','Douglas','1980-03-20','M','4242721755',6,1360),(18796042,'Moses','Jacobson','1997-03-17','M','4245724913',6,831);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15285673,'Logan','Richmond','1990-01-06','M','4242184383',7,1105),(14735579,'Nehru','Gardner','1963-10-18','M','4248354005',6,840),(16837751,'Timothy','English','1963-01-17','M','4243391350',6,1221),(23161977,'Brody','Sloan','1971-07-14','M','4244371280',2,690),(19387958,'Hop','Kirkland','1985-08-19','M','4248675092',3,729);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16746782,'Bernard','Ruiz','1967-12-13','M','4248676289',2,968),(19975938,'Brent','Higgins','1991-12-07','M','4243101348',7,998),(25455131,'Jin','Underwood','1986-11-26','M','4241532386',2,1271),(23392661,'Blake','Gomez','1986-09-01','M','4249387999',7,1383),(17162379,'Owen','Hurst','1974-07-10','M','4248842533',5,1378);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16275352,'Jonas','Morse','1961-02-13','M','4244234938',5,1442),(17860483,'Yoshio','Leon','1972-08-03','M','4242205002',3,1457),(19425911,'Nathaniel','Patel','1967-11-22','M','4244022599',5,1118),(19506998,'Armand','Burt','1985-10-25','M','4247597117',7,1210),(15366545,'Russell','Kline','1977-01-15','M','4247489949',7,1122);

	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15960535,'Felicia','Good','1993-02-26','F','4245956313',5,1178),(23146825,'Lunea','Greer','1968-02-19','F','4245796560',6,1487),(12032776,'Cara','Tyler','1989-10-16','F','4241994836',7,458),(17810852,'Helen','Mckinney','1965-09-28','F','4245540295',5,1487),(13080002,'Camilla','Campbell','1998-03-20','F','4243107293',1,1438);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22047891,'Sade','Dotson','1978-06-15','F','4249573079',4,995),(17093589,'Hayley','Wise','1988-03-07','F','4247063815',4,1488),(10078066,'Wynne','Johnson','1994-11-29','F','4244031193',3,1434),(17435884,'Mona','Head','1965-11-14','F','4242123946',5,985),(24420525,'Aimee','Durham','1974-08-31','F','4244731827',6,367);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20794758,'Ocean','Kirby','1961-01-24','F','4249953302',3,882),(16799406,'Angelica','Hunt','1962-03-09','F','4242584277',5,475),(10786177,'Jaden','Craft','1967-11-04','F','4243613337',1,889),(15183590,'Jacqueline','Strong','1965-09-29','F','4249279830',4,1136),(13186885,'Margaret','Rivera','1993-05-26','F','4245082059',3,1483);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23412833,'Judith','Guthrie','1981-03-29','F','4246659137',4,1368),(24862175,'Eleanor','Yang','1983-01-16','F','4241807396',3,1162),(23719180,'Cassady','Dickerson','1968-05-17','F','4243572898',2,1303),(13802602,'Brittany','Acevedo','1974-02-09','F','4246906938',3,1095),(13764233,'Jeanette','Norman','1992-10-09','F','4241580566',4,1464);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16733454,'Sade','Kirk','1963-10-12','F','4244475433',3,685),(25777118,'Kyra','Sexton','1977-12-19','F','4244041488',1,1370),(16482212,'Quyn','Barlow','1974-01-08','F','4247956263',6,1377),(16582794,'Hollee','Mcconnell','1974-09-15','F','4247520153',4,752),(24685452,'Desirae','Colon','1993-04-01','F','4244899653',5,874);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10831047,'Pearl','Cannon','1983-06-13','F','4248956581',3,923),(13005587,'Martena','Francis','1987-07-24','F','4249567302',7,1467),(11556643,'Shea','Floyd','1990-10-14','F','4242422676',2,851),(12514646,'Hayley','Miranda','1964-11-27','F','4243693034',4,833),(23824144,'Renee','Huff','1967-01-28','F','4246900740',5,592);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22975803,'Briar','Oneil','1992-02-09','F','4244418803',7,559),(22239181,'Karina','Hamilton','1970-02-14','F','4246162436',2,857),(20091987,'Lavinia','Walters','1960-05-03','F','4242080356',5,1414),(13776619,'Deborah','Witt','1969-04-13','F','4242087353',6,626),(23532138,'Lunea','Sweeney','1965-12-30','F','4242999902',4,1287);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14496528,'Alisa','Lawson','1996-12-25','F','4243132267',6,823),(22861340,'Bell','Whitaker','1991-08-10','F','4247865704',4,1219),(10892783,'Adria','Brady','1972-05-24','F','4243669795',3,948),(11207166,'Blaine','Andrews','1979-10-23','F','4246364954',1,1287),(11707616,'Bo','Gonzalez','1964-10-17','F','4243224487',3,1127);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17059084,'Rama','Blackburn','1968-12-24','F','4249701590',2,1369),(18692144,'Roary','Gentry','1996-11-22','F','4243550806',3,903),(15245423,'Venus','Buchanan','1964-06-07','F','4249748038',6,1168),(17000880,'Wilma','Macdonald','1969-06-15','F','4246864890',3,771),(21160062,'Lael','Wilder','1975-07-25','F','4243348402',2,1377);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19412410,'Ocean','Ewing','1966-06-26','F','4244295057',2,954),(18519657,'Zoe','Cummings','1971-03-10','F','4247344944',4,471),(12116356,'Jana','Campbell','1979-02-06','F','4242931393',1,753),(23277607,'Eve','Holmes','1960-09-28','F','4242358722',5,623),(19651219,'Camille','Graves','1985-11-15','F','4247934060',5,950);

	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13147650,'Arsenio','Fulton','1962-05-09','M','4141537192',21,848),(24366441,'Chadwick','Parrish','1973-08-06','M','4146408780',18,895),(24297935,'Finn','Harrell','1995-07-14','M','4126014098',18,1202),(25365365,'Jackson','Ayers','1995-07-08','M','4241875151',8,653),(24347417,'Michael','House','1992-12-24','M','4168539839',5,1471),(12746732,'Simon','Perkins','1987-09-21','M','4129302526',6,979),(20942933,'Dante','Carter','1993-08-15','M','4127630381',10,651),(15495111,'Wylie','Morales','1979-01-29','M','4243673398',20,1145),(13821044,'Branden','Finch','1987-08-12','M','4129802253',4,740),(10816757,'Jelani','Best','1998-05-29','M','4162534985',23,888);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22738357,'Brandon','Shaw','1989-01-22','M','4162311097',10,1312),(15875329,'Joel','Tran','1964-07-23','M','4247303845',18,967),(24325832,'Castor','Barnett','1993-09-06','M','4243163244',14,1460),(11574786,'Akeem','Tate','1980-07-02','M','4126742998',13,878),(18185485,'Carlos','Young','1998-04-04','M','4244776994',21,464),(22022822,'Dylan','David','1982-11-15','M','4125664606',6,1316),(11913993,'Abraham','Good','1978-07-11','M','4148909247',20,1402),(11437005,'Jacob','Bennett','1961-02-18','M','4144680860',1,905),(16524444,'Marsden','Harper','1991-08-11','M','4126130473',1,1333),(14596035,'Conan','England','1968-06-12','M','4147067207',3,1107);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11112089,'Allistair','Hobbs','1970-09-05','M','4169148766',25,849),(16459133,'Dalton','Osborne','1986-10-15','M','4123726262',2,387),(16275043,'Igor','Boyd','1966-10-02','M','4142968685',23,1162),(18427278,'Simon','Keller','1969-12-11','M','4245496986',10,843),(16073248,'Harper','Vasquez','1971-05-22','M','4241897671',7,475),(12380769,'Bevis','Mendoza','1961-11-07','M','4142558861',10,1347),(24198431,'Henry','Macdonald','1976-01-30','M','4167959606',17,1340),(25494463,'Akeem','Morse','1976-10-24','M','4145008011',13,1204),(10038304,'Cain','Cummings','1962-03-30','M','4162010708',1,1342),(12945393,'Driscoll','Gillespie','1986-08-21','M','4141685895',21,608);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14949338,'Clarke','Puckett','1965-11-27','M','4162441829',14,644),(20454946,'Caesar','Moran','1974-10-20','M','4125050943',17,883),(20410144,'Gage','Bennett','1965-04-09','M','4165141229',14,695),(16274744,'Michael','Saunders','1977-08-25','M','4123298191',24,816),(20747226,'Kirk','Battle','1964-10-05','M','4127086022',16,996),(12211449,'Kadeem','Tate','1992-05-12','M','4149190679',6,1291),(21693678,'Elvis','Orr','1973-04-12','M','4167624965',16,841),(16668162,'Mason','Weaver','1970-06-24','M','4128497431',9,426),(11289611,'Kareem','Boyer','1984-12-15','M','4149435917',15,1243),(14924220,'Wallace','Gardner','1977-06-12','M','4125882502',20,963);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15151883,'August','Norman','1987-10-16','M','4248652563',8,843),(18762582,'Jonas','Vance','1972-10-13','M','4144936035',18,823),(24270988,'Lucius','Reyes','1973-05-28','M','4161210766',9,626),(19021043,'Harlan','Fleming','1995-09-25','M','4242548966',2,746),(11641327,'Seth','Conner','1970-12-08','M','4129650120',16,759),(24910120,'Sebastian','Rivera','1977-11-25','M','4163284444',5,1387),(11788467,'Conan','Mcgee','1982-10-31','M','4120034742',3,1100),(15683827,'Rahim','Simpson','1974-02-28','M','4160748489',11,1110),(19888255,'Brendan','Herman','1985-04-30','M','4243058615',13,748),(16910560,'Neil','Kelly','1985-11-01','M','4246777041',14,875);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16201826,'Christopher','Gomez','1994-03-15','M','4147297376',7,1162),(19634142,'Stewart','Decker','1969-08-22','M','4144368751',12,787),(10766153,'Dean','Garcia','1980-12-15','M','4166073894',18,481),(19604587,'Daniel','Rhodes','1969-07-14','M','4127978171',1,1435),(12792315,'Stuart','Humphrey','1980-02-07','M','4143603982',22,1461),(23705984,'Theodore','Ramsey','1982-04-05','M','4148029736',8,1125),(14151413,'Garrett','Hodge','1990-06-14','M','4247098320',5,729),(16044980,'Michael','Moore','1972-10-19','M','4120631522',8,1084),(18850600,'Yuli','Lynch','1976-09-07','M','4164701541',15,1344),(12567252,'Anthony','Woodard','1966-10-11','M','4144757267',12,1327);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20582977,'Robert','Acosta','1969-07-24','M','4249739470',22,1469),(18569430,'Micah','Sawyer','1976-05-20','M','4144221325',1,1064),(10577316,'Linus','Sullivan','1978-10-29','M','4129639309',4,1409),(16004859,'Robert','Black','1985-02-26','M','4163835575',25,1387),(13168461,'Amos','Page','1964-03-02','M','4126054797',8,842),(22797440,'Nehru','Cruz','1995-09-01','M','4146971887',21,557),(11975890,'Timon','Ryan','1961-12-28','M','4148865607',21,746),(16186506,'Carlos','Romero','1978-08-15','M','4246519867',19,1247),(10231398,'Michael','Mcdowell','1967-07-02','M','4248140034',7,725),(25882070,'Aquila','Zimmerman','1976-08-15','M','4122908041',8,1366);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22483655,'Dalton','Vincent','1982-02-26','M','4246866504',8,1456),(23122486,'Craig','Mathis','1983-01-23','M','4248047349',23,1345),(25885503,'Kieran','Hayes','1995-05-26','M','4245504159',17,1405),(11982511,'Wing','Kelly','1998-02-25','M','4241088880',2,791),(21561846,'Paul','Jensen','1969-05-24','M','4143386652',24,574),(13780124,'Hammett','Beard','1983-06-08','M','4245389663',12,1347),(25419882,'Chandler','Delgado','1967-12-11','M','4248512912',10,430),(21024080,'Talon','Atkinson','1984-11-15','M','4126680934',13,1436),(16831831,'Edward','Lewis','1969-11-24','M','4128942736',2,918),(24774617,'Charles','Ewing','1978-10-03','M','4143072531',9,1309);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13045673,'Brent','Salazar','1991-01-18','M','4242215084',3,1276),(15783463,'Dennis','Bray','1961-12-15','M','4126902677',20,1257),(24429298,'Nolan','Marshall','1967-07-16','M','4248149091',21,510),(16557954,'Elvis','Harrington','1968-06-20','M','4168694474',3,1243),(11720153,'Yoshio','Mcclure','1982-12-03','M','4120428474',14,1055),(19888704,'Dane','Joseph','1964-11-11','M','4149503696',18,707),(16408525,'Rahim','Barker','1982-05-22','M','4144678598',24,713),(15218276,'Walker','Dickson','1995-08-08','M','4149620192',23,1075),(19891494,'Laith','Gay','1997-10-25','M','4120115097',15,983),(24511765,'Kibo','Lancaster','1965-06-07','M','4246048344',2,727);
	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15169637,'Todd','Mathis','1970-02-27','M','4165841309',1,846),(18636735,'Kane','Heath','1996-05-03','M','4166244743',22,416),(11758085,'Clinton','Wells','1993-01-27','M','4243637013',21,514),(21572494,'Kelly','Pugh','1971-05-03','M','4128630207',17,943),(17307837,'Logan','Harmon','1993-08-04','M','4129659044',18,1453),(18020390,'Ralph','Clements','1974-11-03','M','4166792141',23,555),(25484987,'Dylan','Cohen','1963-01-02','M','4127811238',9,428),(19954777,'Boris','Merrill','1990-03-20','M','4145278999',22,997),(10553028,'Robert','Mayer','1979-07-18','M','4166222765',19,398),(13511909,'Brandon','Acevedo','1971-05-04','M','4162042299',15,1408);

	INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14197965,'Zephr','Blackwell','1971-09-28','F','4241036607',5,968),(21068653,'Serina','Bryan','1986-08-21','F','4144581338',9,804),(14145854,'Flavia','Allison','1985-08-16','F','4142153676',13,987),(24947634,'Quon','Watson','1995-12-02','F','4144221061',21,1364),(17856983,'Tatum','Howard','1963-05-02','F','4148747557',2,370),(13418689,'Leigh','Buckley','1971-08-14','F','4160706194',11,503),(24247646,'Delilah','Jefferson','1983-06-23','F','4126733070',25,1361),(10684363,'Jordan','Molina','1960-12-15','F','4162186334',18,1135),(18216408,'Germane','Joyce','1964-07-23','F','4168877693',24,1140),(17401482,'Sandra','Burch','1993-08-31','F','4144567978',9,744);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20900546,'Shea','Faulkner','1992-12-01','F','4143473922',4,1039),(17691695,'Amy','Ruiz','1972-12-11','F','4121206708',23,1267),(16291237,'MacKensie','Horn','1988-01-03','F','4244700504',23,1336),(15214782,'Imelda','Macias','1967-06-19','F','4122504439',24,1458),(11365874,'Audra','Steele','1988-06-24','F','4244816208',23,753),(16888222,'Holly','Greene','1972-01-01','F','4240838080',3,1235),(11643500,'Teagan','Cain','1979-08-16','F','4242557354',22,1217),(11359949,'Sybil','Lynn','1993-11-01','F','4248756084',20,1113),(18449195,'Britanni','Haley','1986-11-27','F','4161252476',18,779),(18892993,'Ann','Tanner','1970-08-14','F','4169028262',7,1044);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24697126,'Rebekah','Small','1974-11-04','F','4240264763',14,890),(12101900,'Ayanna','Myers','1995-03-18','F','4129968382',8,1008),(15690648,'Kylee','Whitehead','1996-07-04','F','4146358251',9,456),(16250993,'Nadine','Walton','1996-06-29','F','4247637116',1,1338),(19347959,'Keelie','Snider','1982-10-03','F','4127288293',6,1370),(18794392,'Quin','Gallegos','1966-07-21','F','4124619753',17,1025),(10818384,'Ingrid','Hood','1973-11-16','F','4142198616',15,529),(15662593,'Constance','Conrad','1972-03-21','F','4148416915',11,1278),(17365002,'Wilma','Conrad','1979-04-16','F','4160735825',12,1488),(14249091,'Virginia','Haney','1964-01-24','F','4242370023',19,994);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20686811,'Galena','Jefferson','1988-09-17','F','4149102164',16,1340),(14990525,'Xantha','Floyd','1983-08-22','F','4245813144',19,1010),(21481806,'Callie','Sandoval','1963-06-13','F','4246498658',13,1300),(25521074,'Beverly','Castillo','1981-07-17','F','4169109984',25,829),(16112435,'Mari','Wells','1974-12-28','F','4245330330',16,1399),(20976828,'Cora','Barr','1990-07-04','F','4127656729',3,407),(11185486,'Farrah','Avery','1985-12-08','F','4245660687',18,955),(16624061,'Emma','Aguilar','1989-09-14','F','4165241368',2,1337),(18574381,'Raven','Delacruz','1978-05-08','F','4145648138',10,839),(16560867,'Michelle','Dotson','1960-08-22','F','4144965601',22,1466);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23371187,'Hedy','Butler','1982-12-27','F','4124251356',21,955),(18079972,'Willow','Bryan','1967-12-11','F','4128953558',12,609),(15008083,'Ivana','Luna','1968-10-19','F','4247310184',16,877),(18660647,'Hillary','Cooper','1976-12-25','F','4126712644',21,893),(10563010,'Amy','Stevenson','1965-04-23','F','4148918806',15,976),(13280188,'Chanda','Mcknight','1995-01-31','F','4164992290',8,1033),(16414230,'Shea','Drake','1985-10-15','F','4169770565',21,701),(16555300,'Hilda','Osborne','1993-06-11','F','4164367076',2,642),(20657294,'Ivory','Witt','1974-08-02','F','4160781583',4,1201),(20775375,'Calista','Wolf','1987-04-17','F','4243863755',9,1492);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16896546,'Zia','Church','1980-09-22','F','4148240243',2,1147),(23346196,'Noelani','Macdonald','1994-06-21','F','4168775421',8,634),(13676950,'Rhona','Watts','1995-08-17','F','4120424916',21,1264),(13813248,'Nyssa','Giles','1994-11-20','F','4241960325',21,1416),(18340236,'Olivia','Fulton','1970-01-03','F','4162005393',23,646),(23322696,'Sacha','Irwin','1983-09-09','F','4248639481',14,442),(15274764,'Ina','Diaz','1960-09-23','F','4124934646',1,1314),(21469481,'Rhona','Rogers','1966-07-19','F','4161171834',2,1436),(24795166,'Imani','Mcclain','1970-09-02','F','4242267272',2,1220),(20120238,'Darrel','Hobbs','1985-09-18','F','4241638062',8,1231);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10371134,'Reagan','Kennedy','1962-08-01','F','4145911813',4,1242),(13113939,'Martina','Emerson','1961-08-14','F','4243094103',5,982),(18515747,'Colette','Mcclain','1990-10-24','F','4241667817',20,1447),(12894116,'Brenda','Mejia','1962-06-26','F','4246180734',11,533),(10830922,'Sybill','Byrd','1963-12-31','F','4249655985',7,368),(21623273,'Quyn','Cleveland','1983-04-01','F','4128548069',12,1087),(22442688,'Maggy','Carpenter','1989-08-05','F','4122889565',16,1484),(21165167,'Ava','Johnson','1984-04-13','F','4141169999',13,1442),(23928542,'Britanni','Fleming','1986-01-08','F','4126127127',1,769),(11456493,'Hedy','Conway','1980-04-10','F','4161919215',4,1068);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21767515,'Shafira','Myers','1968-03-05','F','4168137381',2,615),(19754234,'Adena','Lara','1981-06-10','F','4125603398',17,1266),(19958099,'Deirdre','Huffman','1960-11-17','F','4127326567',10,628),(14796977,'Cassandra','Mckenzie','1962-12-05','F','4121605501',15,766),(17215934,'Lacey','Solomon','1967-10-13','F','4160170339',5,581),(14375080,'Daryl','Townsend','1993-11-03','F','4168787307',3,445),(25922911,'Robin','Salinas','1983-12-07','F','4123009506',24,1271),(24871891,'Haley','Dudley','1988-05-22','F','4120253622',25,979),(17272724,'Alisa','Hernandez','1973-12-31','F','4247139624',22,704),(22052140,'Aline','Mcclain','1985-01-13','F','4128895236',1,465);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15711831,'Aspen','Manning','1975-06-15','F','4168880104',7,873),(25366780,'Venus','Parks','1960-12-04','F','4242653734',22,1447),(19626342,'Adele','Maxwell','1978-06-06','F','4244989896',13,1411),(25154832,'Fatima','Mack','1962-09-25','F','4142186339',12,640),(11301512,'Wilma','Cantrell','1984-03-20','F','4167911665',25,1128),(21080780,'Cora','Maxwell','1978-01-17','F','4164139518',24,954),(20682754,'Kyra','Mccormick','1961-08-05','F','4144372148',19,705),(17227431,'Vera','Oneill','1991-11-01','F','4241697109',8,968),(18781066,'Sopoline','Dale','1969-04-30','F','4161031510',14,795),(11922888,'Casey','Cortez','1964-11-01','F','4160614241',3,859);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20798960,'Rhiannon','Shelton','1998-02-09','F','4245199234',24,1347),(25475860,'Ursula','Drake','1982-01-27','F','4247945503',19,669),(14336008,'Dawn','Dickerson','1969-06-05','F','4142311661',9,1241),(24415773,'Heidi','Foster','1986-03-27','F','4126674050',25,792),(16070220,'Blair','Kirby','1980-02-06','F','4145277641',5,1438),(24579330,'Nayda','Ramsey','1963-05-01','F','4240463484',15,1048),(11458041,'Ashely','Rivera','1989-07-07','F','4146725154',13,1170),(20787796,'Lunea','White','1979-07-25','F','4148659564',18,1465),(13116385,'Juliet','Donaldson','1984-12-08','F','4146151643',16,1225),(25589196,'Hannah','Kim','1973-04-14','F','4123997683',18,1323);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23803459,'Destiny','Cherry','1985-06-17','F','4243068849',17,935),(18278360,'Myra','Baxter','1970-10-28','F','4128053035',2,878),(25420692,'Adria','Pittman','1978-03-07','F','4240497861',20,1087),(19891832,'Jayme','Snow','1980-01-02','F','4168365278',6,1472),(10637743,'Dorothy','Compton','1995-07-03','F','4144658797',5,1274),(13893786,'Scarlett','Perez','1987-01-20','F','4125905009',6,545),(22555611,'Tatiana','Phelps','1968-09-23','F','4128734006',11,382),(19755616,'Deirdre','Bates','1978-11-20','F','4120889722',11,1475),(13608546,'Idola','Irwin','1987-04-16','F','4241548904',17,1461),(12765663,'Laura','Chan','1982-06-17','F','4163744844',2,1446);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15373324,'Jillian','Herring','1980-10-21','F','4166982157',9,462),(11114446,'Francesca','Klein','1979-06-21','F','4147557695',8,808),(13498011,'Quon','Whitfield','1980-08-21','F','4169299981',15,972),(14556669,'Hedda','Roth','1973-03-01','F','4126413562',17,527),(14057607,'Wynter','Buckner','1973-06-11','F','4244825866',21,1138),(13317659,'Regan','Middleton','1964-03-28','F','4160325554',23,506),(10891083,'Illiana','Harper','1981-03-20','F','4147346322',21,413),(20874817,'Cassidy','Albert','1985-10-21','F','4242750184',25,703),(24373929,'Tasha','Dodson','1996-03-26','F','4142956309',6,891),(13229977,'Ayanna','Workman','1980-06-18','F','4121146679',2,735);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12274236,'Jorden','Gordon','1988-06-30','F','4246959324',21,1313),(21762952,'Brynne','Thornton','1985-05-31','F','4169221210',11,877),(23217920,'Riley','Hull','1990-11-07','F','4127863020',8,1018),(22274173,'Imogene','Townsend','1994-10-24','F','4241029694',21,835),(16065118,'Michelle','Burns','1968-05-12','F','4124062010',16,707),(13014847,'Orli','Mcgee','1960-10-04','F','4242674758',4,564),(22661001,'Paloma','Dejesus','1989-10-28','F','4147284678',1,478),(20064335,'Sandra','Thornton','1989-11-04','F','4244590531',22,1435),(22614424,'Lydia','Stokes','1990-07-22','F','4144466455',14,886),(12748672,'Renee','Roy','1976-05-10','F','4141041750',19,1030);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17004752,'Sheila','Wilson','1973-09-06','F','4126057569',24,449),(13690134,'Cynthia','Gray','1976-03-23','F','4164921532',23,1472),(13239412,'Clementine','Woods','1974-10-24','F','4143878236',1,630),(10682829,'Rinah','Coffey','1993-04-12','F','4144827857',2,399),(14607397,'Aurelia','Wilkerson','1975-01-17','F','4164731456',17,989),(15068261,'Quintessa','Colon','1992-08-07','F','4128276204',15,924),(19863429,'Morgan','Stephens','1975-06-03','F','4161694254',13,916),(21160769,'Kristen','Moon','1966-11-30','F','4128187790',7,941),(16157288,'Nomlanga','Roman','1964-03-14','F','4143590348',2,1307),(18184759,'Aphrodite','Valdez','1996-05-30','F','4120945953',22,1349);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14170746,'Ann','Hoover','1968-08-23','F','4142765196',23,1252),(14154532,'Eve','Shields','1978-04-07','F','4244457800',1,1172),(13579609,'Martena','Webb','1965-05-16','F','4120035825',6,958),(16764970,'Kimberley','Vincent','1966-09-01','F','4240362507',20,825),(16748183,'Indigo','Leonard','1973-12-03','F','4149896053',1,1234),(13211502,'Kylie','Copeland','1965-08-31','F','4169622071',17,986),(22792929,'Rhiannon','Vega','1975-01-21','F','4247217341',5,663),(14623541,'Hannah','Hensley','1991-04-03','F','4144823163',10,1351),(24320417,'Lunea','Hawkins','1961-01-11','F','4164888273',16,980),(25051767,'Stacey','Rivera','1978-10-01','F','4167484139',7,441);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14406732,'Ruby','Ballard','1965-09-14','F','4126907665',16,831),(17064791,'Olga','Orr','1971-06-08','F','4122878329',9,1112),(10510255,'Kimberly','Burks','1994-03-02','F','4129724316',24,1177),(24817987,'Desirae','Sheppard','1976-08-03','F','4160052390',8,438),(18579962,'Melissa','Kramer','1971-07-01','F','4161850739',11,1390),(14868617,'Stacy','Gould','1973-11-22','F','4148891263',3,835),(11760130,'Lani','Mclaughlin','1988-04-06','F','4168398243',2,683),(22626097,'Lani','Garrett','1983-06-19','F','4247297343',1,1004),(15228596,'Stacy','Rosa','1962-12-19','F','4169041444',21,750),(21779904,'Amethyst','Gilmore','1982-11-05','F','4144479383',5,1335);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20495313,'Wanda','Burns','1987-04-25','F','4141569295',11,1270),(12287650,'Emma','Armstrong','1960-09-20','F','4121008981',6,574),(23725046,'Denise','Brock','1989-04-28','F','4145199696',19,1331),(19013486,'Octavia','Bartlett','1979-04-01','F','4240398332',20,797),(21444724,'Evelyn','Compton','1973-10-09','F','4161240309',3,1205),(14241601,'Lillith','Combs','1998-02-27','F','4243091722',22,564),(12299985,'Hadley','Weeks','1985-02-08','F','4122865171',15,681),(22285509,'Shaine','Craft','1969-02-22','F','4120222873',9,420),(14102914,'Tanya','Clark','1963-08-08','F','4144734227',21,477),(10908939,'Yen','Acevedo','1966-04-02','F','4142447552',3,928);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23426067,'Amela','Reeves','1966-06-29','F','4148033173',21,755),(18921073,'Kay','Burns','1993-05-13','F','4127628426',12,1263),(18886299,'Aubrey','Mills','1995-02-12','F','4242584161',23,1190),(11090235,'Vivien','Riggs','1992-05-19','F','4168193496',15,429),(10326053,'Jenna','Sawyer','1982-11-06','F','4122923836',23,1312),(12010653,'Hedy','Walker','1984-08-22','F','4241718869',8,1288),(20523547,'Celeste','Noel','1978-07-04','F','4149885450',14,1115),(15442863,'Genevieve','Velasquez','1973-02-03','F','4166120876',6,1090),(17852972,'Chloe','Merritt','1976-03-19','F','4121691353',12,397),(10486704,'Ria','Mcfadden','1964-01-29','F','4249849956',17,1073);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22130987,'Maite','Mendez','1964-05-29','F','4162359820',7,974),(14500108,'Ulla','Diaz','1961-01-22','F','4141400169',3,380),(10373192,'Indigo','Beard','1969-10-03','F','4146454472',18,1064),(12814717,'Echo','Stark','1963-06-04','F','4141716989',19,748),(15539405,'Doris','Yates','1964-12-21','F','4244491830',25,802),(14046037,'Uta','Rice','1972-06-21','F','4169172229',24,373),(22986354,'Christen','Duncan','1991-06-13','F','4147423298',13,394),(15797925,'Nevada','Castro','1974-09-09','F','4169490804',24,473),(24859181,'Isadora','Weiss','1962-05-07','F','4140960564',8,534),(12995221,'Halee','Mooney','1971-08-20','F','4128577706',22,718);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23812275,'Katelyn','Goff','1972-08-08','F','4243031764',10,1457),(17263414,'Alexandra','Chan','1982-06-13','F','4169861562',6,823),(15245869,'Nola','Rivas','1992-05-23','F','4162034080',1,1384),(10329316,'Lois','Giles','1963-12-30','F','4122685751',20,1002),(16392081,'Blossom','Owens','1973-12-15','F','4123356424',23,501),(22005849,'Oprah','Guy','1987-06-29','F','4124324793',15,867),(22199530,'Tatum','King','1976-05-05','F','4242237364',12,1455),(25164619,'Carolyn','Macias','1985-11-13','F','4243516773',25,816),(19725978,'Karina','Delaney','1990-06-21','F','4125070976',7,734),(21687151,'Mara','Hayden','1977-05-12','F','4125410428',22,848);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18420854,'Urielle','Olson','1986-06-03','F','4248856662',19,944),(13393071,'Quintessa','Obrien','1971-07-24','F','4240047653',17,584),(18552035,'Dominique','Gates','1991-10-03','F','4163635965',14,907),(17836508,'Shelly','Blankenship','1973-05-23','F','4169517886',9,603),(19596932,'Yolanda','Malone','1960-10-11','F','4249698094',18,1301),(12913631,'Sophia','Patterson','1973-11-21','F','4126687229',5,1319),(10436824,'Melodie','Schneider','1980-07-24','F','4166977622',7,409),(12375585,'Julie','Lynn','1985-12-11','F','4248112466',12,1093),(22363088,'Fay','May','1964-08-05','F','4145831352',18,1053),(13695384,'Whoopi','Perry','1983-01-12','F','4145224535',14,510);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22601535,'Quynn','Richardson','1994-02-02','F','4164088288',23,609),(15536295,'Octavia','Monroe','1981-12-12','F','4124922519',3,970),(22452746,'Myra','Justice','1996-05-28','F','4163633306',12,428),(20526835,'Olivia','Parks','1982-09-26','F','4168430030',15,641),(14068422,'Cleo','Whitfield','1975-11-02','F','4164683288',24,457),(20636567,'Delilah','Carter','1976-01-19','F','4164951962',7,713),(17645673,'Zelenia','Holman','1990-03-01','F','4163311336',23,980),(25889039,'Macy','Mills','1986-07-10','F','4141339642',8,636),(20254359,'Catherine','Dodson','1985-05-19','F','4142065757',9,1264),(14728057,'Dawn','Finley','1993-02-19','F','4142518251',4,1069);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13151996,'Neve','Duke','1970-05-07','F','4125362210',18,457),(10418150,'Kaye','Norman','1989-04-10','F','4122768289',12,1273),(22689573,'Kirestin','Bradford','1987-09-10','F','4143535279',23,669),(17363174,'Deirdre','Shields','1964-12-03','F','4147496852',23,1203),(14212171,'Sigourney','Oneal','1989-03-09','F','4144265712',5,659),(18248862,'Ainsley','Craft','1988-11-08','F','4121479956',2,906),(23685345,'Lenore','Spencer','1974-05-25','F','4169547937',22,533),(13049164,'September','Sharp','1977-07-18','F','4145835395',25,1454),(18576731,'Meredith','Salazar','1973-08-30','F','4247438102',25,1160),(24639444,'Avye','Stuart','1962-12-31','F','4149000272',14,968);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18718758,'Geraldine','Houston','1960-11-27','F','4168931668',9,1254),(20324773,'Hannah','Mercer','1982-03-31','F','4165422184',5,1194),(11125596,'Ashely','Quinn','1969-04-10','F','4125587423',4,629),(24314207,'Macey','Mcbride','1980-10-29','F','4143444260',16,1003),(25217646,'Francesca','Gill','1990-03-24','F','4160046882',4,869),(25361074,'Anne','Guy','1993-05-13','F','4122612783',22,1023),(22531817,'Hollee','Lester','1986-04-08','F','4147006618',2,474),(21999960,'Emma','Branch','1992-08-14','F','4140993779',18,996),(22602698,'Ila','Larson','1970-03-19','F','4165459710',21,1462),(11138177,'Bree','Bradley','1989-10-10','F','4165441721',18,1376);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25625829,'Penelope','Ortiz','1974-06-01','F','4140485838',11,407),(19858338,'Quemby','Burks','1970-12-20','F','4247856145',7,1166),(16360990,'Leilani','Hansen','1991-02-21','F','4122917191',21,491),(23856780,'Ivana','Herrera','1991-01-20','F','4125577654',6,808),(22975776,'Clio','Bentley','1967-10-17','F','4122277131',8,1012),(16220462,'Mikayla','Hernandez','1973-12-19','F','4120508091',3,614),(18296290,'Lila','Horton','1961-09-01','F','4242253659',22,721),(18060074,'Wyoming','Fox','1971-12-15','F','4169616217',16,459),(15471058,'Karina','Holcomb','1961-04-02','F','4161145698',18,583),(24735877,'Ursa','Chapman','1994-06-27','F','4124146706',18,748);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16705175,'Indira','Logan','1998-05-03','F','4241208627',12,671),(12046983,'Serena','Woods','1964-03-26','F','4167123471',14,1314),(17310603,'Harriet','Jennings','1960-07-26','F','4145173169',16,802),(25291169,'Adria','Ware','1976-09-11','F','4163564107',9,695),(14686246,'Kaden','Clayton','1982-07-25','F','4249952516',3,410),(20391539,'Kylan','Patrick','1979-07-08','F','4125976224',20,1490),(14654200,'Sopoline','Britt','1985-11-23','F','4167438977',10,905),(18316484,'Zenia','Justice','1968-10-20','F','4124428603',5,748),(15489155,'Wanda','Knapp','1988-03-21','F','4168404052',25,858),(17595438,'Paloma','Bolton','1982-06-04','F','4123502321',16,1127);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14161397,'Hayfa','Rosa','1986-05-26','F','4249745690',11,728),(19721820,'Scarlett','Wiggins','1973-10-08','F','4248858477',14,1158),(22250274,'Jada','Craft','1976-11-06','F','4160071138',25,877),(25997526,'Hedda','Wheeler','1995-02-27','F','4245794852',1,1450),(10994891,'Aline','Park','1990-11-18','F','4246280079',16,1053),(13903314,'Quin','Gamble','1992-05-25','F','4168732624',4,1320),(17668858,'Kelsie','Higgins','1968-07-17','F','4141947370',2,1108),(18013257,'Justine','Dalton','1973-08-26','F','4243772380',20,795),(23000312,'Kylee','Wagner','1966-05-02','F','4248378335',6,1333),(15938109,'Phoebe','Burnett','1983-12-23','F','4149184013',10,371);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25200826,'Ocean','Underwood','1962-10-17','F','4166045223',11,888),(14210678,'Naida','Curtis','1976-09-24','F','4141673504',16,495),(23549575,'Maile','Richard','1968-05-10','F','4167702507',15,1086),(14604938,'Alexandra','Christensen','1978-03-15','F','4145774497',23,692),(25708242,'Regan','Blackwell','1964-07-04','F','4162930812',15,1425),(24535768,'Amy','Bush','1965-06-15','F','4166997246',4,1086),(10917636,'Kirsten','Haney','1966-04-03','F','4163184319',25,1288),(11098300,'Teagan','Wright','1983-10-29','F','4125708787',25,1412),(15063831,'Simone','Benson','1981-09-18','F','4141332248',1,1263),(24730882,'Adrienne','Trevino','1965-04-21','F','4249161678',24,472);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12051683,'Idona','Moss','1967-03-09','F','4165110066',19,1408),(10889541,'Alea','Singleton','1976-07-07','F','4142473698',18,1367),(16627284,'Emerald','James','1990-12-04','F','4168150703',2,1224),(10456918,'Libby','Simmons','1964-03-20','F','4143460630',10,610),(21597682,'Aurelia','Bernard','1972-04-03','F','4142853749',6,1214),(12121401,'Kirsten','Hurley','1994-04-30','F','4145043264',23,922),(15006304,'Riley','Brewer','1986-06-27','F','4126130188',12,1318),(24553884,'Meghan','Albert','1986-08-25','F','4127780289',14,1039),(18041509,'Farrah','Bridges','1978-02-24','F','4141064530',10,1226),(21902246,'Hilda','Harrell','1990-10-10','F','4163930338',12,758);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20899147,'April','Potter','1978-07-23','F','4140345904',12,965),(22365876,'Karleigh','Casey','1988-06-25','F','4146074371',8,892),(15588395,'Freya','Kim','1986-04-11','F','4241897365',7,942),(20859415,'Mikayla','Church','1968-11-28','F','4244350294',22,1235),(25793906,'Gisela','Carr','1972-02-20','F','4121218500',15,1448),(23740829,'Ruby','Calderon','1990-12-29','F','4128320320',25,748),(23103719,'Cassandra','Lindsay','1967-06-17','F','4141926499',5,791),(21560702,'TaShya','Gregory','1973-10-01','F','4121764433',21,1487),(21777312,'Amaya','Morse','1991-02-19','F','4166375639',21,987),(15319977,'Wanda','Vega','1970-11-15','F','4140250347',13,1268);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16966547,'Rooney','Cotton','1986-01-06','M','4247657058',10,969),(19966788,'Joseph','Hensley','1995-06-02','M','4168373934',5,1112),(15985119,'Mason','Kirby','1965-10-10','M','4245759972',1,1362),(19784013,'Travis','Nicholson','1964-03-11','M','4128896216',22,1063),(12554144,'Donovan','Anderson','1989-02-13','M','4249743029',2,919),(10613504,'Trevor','Carson','1983-11-15','M','4142879323',13,1337),(21267377,'Arthur','Travis','1994-10-17','M','4142092749',20,1098),(20047010,'Griffin','Morin','1961-07-08','M','4149007065',6,1121),(22699519,'Logan','Evans','1980-10-04','M','4147050894',18,977),(11887104,'Ivan','Orr','1994-10-09','M','4242897841',6,490);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19728984,'Lionel','Berger','1967-01-20','M','4141019038',16,674),(18163691,'Orlando','Mathews','1984-07-23','M','4145045922',21,365),(17718802,'Ferdinand','Jacobs','1995-06-21','M','4145040895',25,1101),(24413157,'Marvin','Silva','1997-10-03','M','4142523017',6,616),(25911142,'Orson','Reed','1975-07-16','M','4245720679',22,537),(17618941,'Elmo','Spears','1980-05-23','M','4146089234',20,904),(10315191,'Hoyt','Mcintyre','1989-11-30','M','4162224678',25,361),(13754739,'Levi','Cook','1977-04-10','M','4169875190',18,506),(25884401,'Alfonso','Nieves','1970-12-26','M','4148262404',18,595),(11699495,'Ezra','Mcknight','1981-04-16','M','4248610259',5,1399);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11805808,'Lyle','Herman','1983-10-15','M','4169303107',2,1020),(13814908,'Hayes','Small','1965-06-27','M','4146470260',10,549),(25694240,'Armando','Randall','1985-04-29','M','4121340136',24,418),(22761918,'Lawrence','Glenn','1961-03-22','M','4242225368',17,1266),(18769122,'Philip','Becker','1985-09-03','M','4247603511',23,1196),(24830416,'Vaughan','Stout','1974-05-18','M','4144936307',16,1265),(15670469,'Colt','Stein','1986-09-19','M','4244573769',7,968),(23055155,'Cyrus','Rowe','1975-04-05','M','4166980678',3,952),(19761547,'Walker','Vasquez','1985-11-22','M','4248878042',22,437),(18858188,'Brett','Tucker','1964-12-26','M','4163854897',2,524);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24851887,'Beau','Rollins','1987-10-24','M','4161130316',17,789),(11676270,'Micah','Pickett','1992-03-22','M','4167125646',21,805),(18633464,'Timothy','Dawson','1960-10-10','M','4169740390',16,536),(24733587,'Warren','Todd','1968-08-15','M','4148307086',18,1269),(15520814,'Alexander','Conley','1991-05-25','M','4241417295',2,1494),(25495429,'Damian','Cortez','1991-07-30','M','4146630522',19,382),(25600781,'Emerson','Rivers','1979-02-11','M','4141136609',7,890),(17109342,'Fitzgerald','Maynard','1986-09-17','M','4248198174',4,416),(15288834,'Drake','Jones','1973-01-18','M','4145565405',14,450),(19878004,'Keefe','Conner','1992-05-14','M','4128727775',6,1342);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13902399,'Amos','Hendricks','1978-03-17','M','4143604495',9,627),(10203654,'Aristotle','George','1990-09-20','M','4121318280',25,498),(11145467,'Branden','Doyle','1966-12-28','M','4129840176',7,1057),(10588399,'Rooney','Guerra','1986-06-13','M','4127737019',15,721),(23322531,'Emery','Talley','1969-07-07','M','4168666461',9,975),(18583086,'Chaim','Levine','1967-02-18','M','4241575360',25,1488),(25781669,'Asher','Gross','1963-04-03','M','4121654771',24,900),(17229547,'Garrett','Chan','1983-06-25','M','4149614161',12,772),(15554296,'Alfonso','Levine','1973-05-27','M','4127630495',20,1021),(16262295,'Griffin','Salas','1973-12-01','M','4128793468',6,1078);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20317455,'Avram','Tate','1973-03-14','M','4246306759',15,970),(23964810,'Chester','Burris','1976-10-30','M','4248165376',4,740),(21200892,'Ronan','Watson','1996-08-08','M','4126599402',10,742),(18988384,'Grant','Vinson','1969-03-09','M','4128182811',24,984),(12357692,'Garrett','Keller','1964-08-27','M','4122059087',5,674),(23676238,'Tucker','Wells','1970-03-01','M','4169954439',4,375),(13009644,'Macaulay','Stephens','1968-02-07','M','4126479961',15,708),(10276955,'Abraham','Silva','1974-12-15','M','4129722124',13,809),(22363683,'Gray','Haley','1968-03-22','M','4167924105',9,1072),(19955569,'Yoshio','Baker','1994-04-07','M','4241354640',7,1057);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11083236,'Lionel','Guerrero','1989-02-15','M','4242442808',14,716),(20489452,'Joshua','Copeland','1988-09-12','M','4124357031',14,612),(22691375,'Nissim','Herman','1960-07-29','M','4166832764',16,1327),(25061937,'Erich','Barrera','1976-07-04','M','4165153137',25,1150),(20437656,'Laith','Phillips','1969-03-29','M','4168911353',15,545),(20948674,'Lucas','Mcintyre','1962-05-05','M','4240281539',10,435),(16698442,'Fritz','Conner','1961-02-02','M','4163891310',7,1021),(24321795,'Darius','Jacobs','1989-08-21','M','4244956777',11,1118),(20413476,'Hamish','Ortega','1992-03-09','M','4165976642',14,557),(23871127,'Harding','Sawyer','1987-08-03','M','4162737767',24,688);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25832951,'Nero','Ward','1976-11-01','M','4247284663',2,884),(21259756,'Ronan','Mcdonald','1997-09-18','M','4164673315',13,392),(21180494,'Gregory','Orr','1989-04-18','M','4167184265',13,1333),(17827867,'Alexander','Gregory','1967-01-08','M','4166713978',13,777),(25069613,'Uriah','Combs','1964-07-26','M','4147256406',24,1486),(22060811,'Guy','Adkins','1971-02-07','M','4128434861',21,1311),(21073464,'Orlando','Farley','1980-04-29','M','4164061474',9,998),(15566932,'Calvin','Brooks','1993-11-09','M','4141717528',18,1352),(12230119,'Fuller','Donaldson','1994-01-21','M','4242646219',14,1352),(13226261,'Luke','Riley','1991-10-24','M','4140434080',11,660);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14531004,'Amir','Pugh','1970-05-11','M','4125601236',5,519),(21358183,'Xavier','Figueroa','1977-08-24','M','4165746186',6,732),(18811318,'Baxter','Francis','1986-11-28','M','4243155238',8,1039),(24371988,'Thane','Wade','1973-02-02','M','4244278956',5,416),(22266432,'Macaulay','Hill','1967-03-18','M','4243897463',13,1227),(10656826,'Ali','Frost','1968-07-05','M','4163739027',11,446),(15151836,'Craig','Lara','1990-06-15','M','4124775742',16,576),(17205339,'Nasim','Fowler','1975-06-01','M','4149344331',10,786),(19573980,'Gregory','Klein','1970-02-27','M','4146867802',7,481),(24001283,'Nigel','Kelly','1981-08-08','M','4242852991',7,1490);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18321730,'Reece','Sheppard','1981-09-17','M','4123682920',19,445),(24313337,'Trevor','Adams','1984-06-28','M','4243556193',20,1126),(19592353,'Kirk','Key','1963-12-08','M','4147931972',13,1160),(19299226,'Joseph','Fitzpatrick','1969-12-04','M','4149396145',18,1201),(15566400,'Elvis','Wise','1969-08-14','M','4124397275',4,474),(15023505,'Palmer','Stuart','1988-04-24','M','4167886613',15,834),(11521954,'John','Charles','1994-12-17','M','4144048056',16,492),(10494452,'Harding','Waters','1989-10-17','M','4246501771',8,1221),(16271177,'Branden','Mayer','1961-11-02','M','4168611451',20,1388),(19543450,'Myles','Caldwell','1983-02-05','M','4129842170',16,899);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21205489,'Jarrod','Santos','1964-05-30','M','4160257127',22,1380),(17827209,'Henry','Gilbert','1994-08-18','M','4248440212',12,966),(10666412,'Edward','Farmer','1964-03-22','M','4165573082',12,689),(13566939,'Murphy','English','1960-08-29','M','4126470875',25,1300),(23791344,'Martin','Klein','1982-06-27','M','4167678364',22,393),(14400195,'Odysseus','Pugh','1961-02-20','M','4169977574',9,641),(23587184,'Yoshio','Gardner','1968-01-09','M','4148210672',20,819),(16874518,'Erasmus','Carpenter','1985-09-24','M','4140047914',10,1267),(17898724,'Quentin','Knight','1980-08-04','M','4244406193',16,381),(23018576,'Logan','Barber','1985-11-22','M','4128340577',14,421);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12100551,'Kasper','Orr','1982-01-29','M','4249857909',4,1410),(14538397,'Lucian','Gray','1976-01-20','M','4247065735',9,1492),(20303250,'Merritt','Stein','1970-03-18','M','4162710587',11,835),(16542166,'Aidan','Griffith','1974-06-30','M','4165997713',14,1171),(11251881,'Timothy','Bullock','1970-04-18','M','4124872066',7,1381),(22713832,'Valentine','Hart','1988-10-13','M','4242093084',7,1371),(21026964,'Colby','Sullivan','1993-07-14','M','4240371237',8,1413),(10295303,'Damon','Mcmahon','1992-10-29','M','4147661103',11,1164),(10954668,'Eaton','Sargent','1988-01-27','M','4248027372',12,1406),(12107356,'Demetrius','Gardner','1993-01-28','M','4147057478',5,1378);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11287277,'Kenneth','Hester','1970-12-10','M','4240276391',19,895),(20580095,'Arsenio','Hampton','1984-12-29','M','4129133003',20,431),(14377091,'Malcolm','Conley','1990-07-27','M','4125714723',6,733),(13825923,'Ulysses','Mendoza','1968-12-17','M','4123426354',12,560),(23562720,'Howard','Mcneil','1996-01-25','M','4248845181',17,592),(10207645,'Abraham','Clarke','1995-03-29','M','4162368811',21,676),(25580930,'Carlos','Snow','1976-07-19','M','4166159463',18,471),(13769399,'Ethan','Ford','1984-10-19','M','4125879824',25,490),(16863892,'Malcolm','Fischer','1972-08-21','M','4149532584',12,1469),(18624911,'Abel','Gomez','1971-03-06','M','4169498016',19,1457);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17784547,'Randall','Saunders','1964-08-12','M','4149977944',3,751),(17361490,'Abbot','Monroe','1978-03-23','M','4241327284',20,486),(22497803,'Keaton','Holmes','1973-02-05','M','4147436319',11,483),(20615609,'Logan','Kelley','1971-03-10','M','4166753608',15,1118),(14198135,'Tanek','Wagner','1983-05-15','M','4162808319',24,1362),(22042852,'Channing','Cooke','1969-02-02','M','4121767474',25,612),(12798205,'Barrett','Mcmillan','1993-11-09','M','4247411316',18,1479),(20308176,'Oliver','Dorsey','1963-04-22','M','4244257259',4,971),(18323464,'Plato','Chase','1995-01-30','M','4247942803',16,707),(20750094,'Stewart','Patterson','1973-06-19','M','4164045685',5,598);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24349054,'Arsenio','Frost','1988-06-29','M','4166526953',24,937),(24839198,'Hashim','Petersen','1996-09-01','M','4141699983',2,1481),(16792548,'Demetrius','Christian','1964-07-03','M','4169227061',25,707),(18248519,'Beck','Bass','1972-10-31','M','4240213247',12,980),(18278850,'Bruce','Benson','1974-03-26','M','4168097825',7,1100),(14933087,'Gil','Dawson','1967-12-27','M','4128463139',15,1040),(12362655,'Fitzgerald','Alvarez','1973-10-31','M','4124970897',14,809),(21619534,'Abraham','Stevenson','1973-10-02','M','4245662213',13,380),(21305798,'Brennan','Booth','1967-01-09','M','4246649673',17,557),(19052148,'Wylie','Jackson','1961-03-01','M','4123893553',12,840);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13033336,'Addison','Hubbard','1993-03-03','M','4163568554',11,424),(17589234,'Cullen','Armstrong','1987-10-29','M','4247725987',22,911),(13841280,'Tyler','Norton','1964-04-10','M','4169335349',17,681),(18209106,'Valentine','White','1985-01-18','M','4240985683',9,1269),(22070314,'Shad','Lloyd','1962-09-08','M','4146667605',6,1109),(20921965,'Aaron','Campbell','1965-07-30','M','4121243462',17,1414),(10277200,'Ray','Wilson','1988-07-31','M','4169978553',14,1355),(13061380,'Allistair','Garcia','1976-04-26','M','4162139819',1,1453),(14156054,'Igor','Holman','1987-11-19','M','4161105327',16,627),(25759271,'Grady','Benjamin','1976-11-29','M','4168070297',3,649);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11269597,'Craig','Adams','1964-11-10','M','4249255452',7,751),(25816584,'Aladdin','Sweet','1983-11-10','M','4244935705',20,1146),(17293555,'Jerome','Cohen','1988-03-24','M','4140301417',6,845),(12147136,'Fritz','Rios','1991-08-20','M','4241116526',2,1338),(25328683,'Cyrus','Mcguire','1976-10-21','M','4161141390',9,1100),(17883660,'Dustin','Garrison','1997-12-10','M','4127084599',24,399),(22239123,'Malik','Pittman','1988-06-17','M','4164211015',16,1317),(20915420,'Keane','Williamson','1965-02-22','M','4166405837',6,591),(24348966,'Brody','Barlow','1985-12-10','M','4249158977',16,1071),(19235377,'Ethan','Simpson','1991-06-24','M','4240702119',10,680);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20511304,'Anthony','Holman','1978-05-14','M','4123466323',17,1013),(22453455,'Leonard','Weber','1978-04-03','M','4244376289',22,1319),(20146893,'Trevor','Dickerson','1993-07-05','M','4127217598',12,986),(14574793,'Joel','Mcconnell','1975-09-22','M','4128057555',18,1348),(22079911,'Lane','Sutton','1977-11-05','M','4247583114',3,1091),(21434822,'Barclay','Guy','1973-03-22','M','4147120741',14,422),(24476768,'Tarik','Ortiz','1995-01-13','M','4249795607',9,732),(21437208,'Benjamin','Duran','1996-11-01','M','4165388086',7,1056),(19938558,'Jermaine','Vaughan','1976-12-06','M','4145002892',16,611),(17335127,'Chaim','Vinson','1987-11-07','M','4169620175',24,581);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19530316,'Louis','Dickerson','1971-06-12','M','4129082324',6,980),(25377924,'Sawyer','Aguirre','1961-11-24','M','4140966209',20,1235),(14230966,'Bert','Hancock','1982-06-25','M','4124561201',24,765),(19470044,'Rudyard','Washington','1965-05-10','M','4242584936',23,1270),(11244220,'Hector','Barnett','1968-04-13','M','4160760370',15,518),(16050088,'Bevis','England','1997-11-16','M','4163535474',23,1037),(22439260,'Clark','Boyd','1966-02-22','M','4244447603',22,626),(19640991,'Lee','Wilkinson','1989-07-13','M','4146416052',22,1089),(20436951,'Nasim','Roy','1992-08-09','M','4247088170',18,793),(10083648,'Nasim','Knox','1965-10-09','M','4160949239',20,368);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21456413,'Bruno','Zamora','1976-12-22','M','4126493423',11,1183),(25753415,'Hop','Fitzgerald','1961-06-26','M','4244413778',25,1408),(10377873,'Stewart','Foreman','1980-01-06','M','4129579508',11,851),(16287332,'Isaac','Blake','1991-04-13','M','4244804865',7,984),(24077965,'Evan','Clements','1996-04-07','M','4149981603',1,1343),(22060500,'Hammett','Ferrell','1985-04-01','M','4142020572',13,1246),(22315874,'Price','Burnett','1982-12-15','M','4163920824',16,566),(16658191,'Nathan','Rice','1962-11-16','M','4124341441',22,958),(12660748,'Cade','Vance','1991-07-08','M','4129965810',2,1255),(11961083,'Elmo','Mccullough','1985-10-06','M','4162096801',24,603);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17460455,'Phillip','Hays','1964-01-30','M','4120456716',14,532),(11267148,'Fulton','Carr','1975-09-01','M','4148492705',13,509),(21903930,'Chancellor','Pickett','1973-11-12','M','4147378559',20,898),(23446143,'Asher','Jensen','1962-05-30','M','4160078852',25,1406),(20488232,'Joshua','Barry','1990-03-14','M','4166139373',19,1332),(12004651,'Marvin','Talley','1963-09-09','M','4148999171',18,1130),(19343058,'Ray','Petty','1983-09-28','M','4129754820',12,898),(22290458,'Lawrence','Lambert','1962-12-08','M','4244462335',13,400),(10412810,'Fitzgerald','Yang','1967-10-11','M','4240774055',3,502),(13063570,'Leroy','Gilbert','1967-08-16','M','4148960074',2,960);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11409377,'Alfonso','Buckley','1993-02-01','M','4142723084',6,987),(16396903,'Jamal','Holman','1990-05-14','M','4248822351',25,1204),(14350290,'Carl','Castro','1996-01-12','M','4122980696',19,1326),(11625609,'Stone','Mccormick','1968-06-21','M','4246603672',10,574),(15209181,'Bert','Nelson','1972-06-05','M','4141250516',18,1191),(24829429,'Lionel','Berry','1985-06-08','M','4167273255',21,799),(20977159,'Stuart','Gonzales','1975-02-19','M','4166741542',4,787),(19387015,'Alfonso','Harding','1970-03-29','M','4127117069',2,811),(11665741,'Francis','Cortez','1985-03-25','M','4161559371',4,1092),(18564176,'Tucker','Mathis','1962-11-23','M','4242925337',11,1147);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16095949,'Ahmed','Beach','1962-04-12','M','4168108494',21,736),(22024593,'Fletcher','Slater','1983-12-29','M','4144362178',18,886),(15798103,'Dean','Mendez','1988-06-21','M','4241212549',5,1096),(12708642,'Solomon','Patel','1985-11-23','M','4244449887',17,709),(14447281,'Joel','Farrell','1981-05-12','M','4148051852',17,717),(22480511,'Reese','Howe','1962-08-08','M','4144982065',13,733),(19550074,'Honorato','Combs','1987-05-07','M','4125587190',15,416),(10589380,'Zahir','Pickett','1990-01-22','M','4241892102',9,914),(20459430,'Basil','Burke','1966-04-05','M','4120171562',22,1374),(15909840,'Jerry','Evans','1973-08-08','M','4142337885',10,946);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21090428,'Jerry','Vargas','1965-09-03','M','4163144188',20,928),(15434787,'Wang','Wilder','1990-09-30','M','4160063296',25,807),(23277779,'Maxwell','Willis','1971-05-08','M','4161481397',9,1127),(11792965,'Nash','Parrish','1961-01-09','M','4126041948',1,827),(10702249,'Jelani','Little','1972-08-02','M','4162455942',24,881),(14813269,'Hu','Hart','1977-05-29','M','4120331797',9,987),(12431060,'Raphael','Rosario','1973-03-17','M','4128868734',19,1481),(14813936,'Richard','Bird','1987-10-24','M','4126185119',16,440),(18650074,'Gavin','Anthony','1988-06-19','M','4241459583',24,1300),(21133630,'Travis','Conley','1969-06-25','M','4241303205',16,725);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25107571,'Hiram','Ballard','1962-03-19','M','4143999914',9,660),(20691616,'Troy','Hawkins','1989-11-08','M','4142643257',17,435),(13411334,'Nissim','Tate','1969-03-08','M','4149502635',22,1484),(22665801,'Clayton','Green','1977-09-08','M','4148910673',18,965),(18552555,'Cameron','Scott','1986-12-10','M','4160031028',11,853),(11678802,'Patrick','Rodriguez','1971-11-11','M','4147661320',23,724),(18869650,'Kevin','Hampton','1965-12-06','M','4148294393',13,394),(20779770,'Macon','Cooley','1992-12-24','M','4123788577',4,1002),(14162693,'Mark','Hodges','1981-12-29','M','4122089708',8,414),(17223495,'Cade','Stokes','1996-06-05','M','4121446864',1,1452);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22485812,'Ross','Small','1983-11-15','M','4124282661',17,629),(25211051,'Ray','Pickett','1966-01-11','M','4147539424',4,1134),(21038123,'Griffin','Mcintosh','1994-11-14','M','4144228408',16,734),(22930731,'Drew','Solis','1982-04-27','M','4149284392',18,933),(24727411,'David','Clay','1964-07-31','M','4146557358',4,918),(23071216,'Rahim','Schmidt','1989-05-29','M','4245893517',4,650),(12258944,'Adam','Cleveland','1984-03-26','M','4143446874',9,368),(10772866,'Carlos','Guy','1997-01-11','M','4144434094',10,1333),(20820288,'Eagan','Stephens','1983-06-03','M','4164625909',2,979),(24071278,'Zachary','Whitaker','1991-08-04','M','4143986931',14,760);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12018045,'Giacomo','Larsen','1983-02-11','M','4126861905',10,1142),(10635471,'Dale','Holland','1988-04-03','M','4240712383',21,1480),(16892012,'Chase','Eaton','1994-06-12','M','4161488326',12,711),(24255047,'Kelly','Duncan','1981-10-02','M','4142205319',2,1058),(21267538,'Cade','Ellison','1975-07-17','M','4127267999',16,1339),(22739160,'Kibo','Velazquez','1967-07-30','M','4148729549',15,438),(12837088,'Travis','Tanner','1969-01-06','M','4243292691',14,576),(10769895,'Merritt','Hammond','1980-01-16','M','4140509298',21,1492),(14712523,'Fitzgerald','Solis','1990-11-10','M','4246052206',4,1081),(14056092,'Demetrius','Cameron','1974-01-13','M','4148520197',1,833);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11852336,'Zahir','Munoz','1966-11-23','M','4164842042',16,931),(19205745,'Nasim','Black','1982-02-06','M','4246862178',11,558),(22017098,'Stephen','Barr','1970-05-12','M','4146568567',17,765),(24831884,'Hall','Pruitt','1965-07-02','M','4143289630',12,716),(24484668,'Lucas','Cook','1994-05-18','M','4122154358',13,602),(14406272,'Colt','Carney','1980-04-11','M','4140082664',12,1350),(25532156,'Orlando','Chang','1979-01-24','M','4169962488',9,601),(16760246,'Owen','William','1974-11-28','M','4167292127',25,1010),(14567911,'Elvis','Carey','1960-06-14','M','4248748977',22,376),(16287326,'Ira','Rodriquez','1974-12-21','M','4242091479',6,924);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24694451,'Raphael','Witt','1963-03-12','M','4144361939',6,1330),(17669048,'Aristotle','Rios','1979-06-05','M','4165353418',13,1309),(13490788,'Gavin','Lowery','1993-12-01','M','4249952147',22,1296),(25338395,'Jonas','Hernandez','1990-04-16','M','4168759725',2,1282),(24346649,'Curran','Moore','1965-11-25','M','4142380243',21,1088),(14989023,'Solomon','Mccall','1994-06-29','M','4242171586',11,1444),(17090368,'Cooper','Cook','1972-09-03','M','4120059646',24,955),(11580130,'Addison','Ford','1975-06-08','M','4124398365',22,792),(21041800,'Timothy','Sparks','1994-01-03','M','4148759356',7,818),(12891016,'Chadwick','Watson','1967-08-29','M','4143987046',24,1313);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23288162,'Ciaran','Lynch','1973-11-06','M','4240628534',8,1357),(19611931,'Grady','Cobb','1985-04-22','M','4244115544',23,656),(24072963,'Brenden','Stevens','1966-03-01','M','4128372527',21,1042),(22417808,'Ishmael','Bowen','1983-05-26','M','4144154307',2,1246),(23160686,'Gavin','Hoover','1985-11-09','M','4122244973',3,393),(22011088,'Quentin','Joyce','1968-07-31','M','4141964061',14,1303),(24172633,'Hayden','Duran','1981-06-19','M','4141647531',1,640),(22521101,'Jason','Rollins','1967-10-13','M','4164569739',7,1070),(25093674,'Shad','Bradley','1978-08-16','M','4247958198',25,390),(14695583,'Sebastian','Singleton','1966-05-04','M','4166090207',9,1208);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13652834,'August','French','1992-11-29','M','4249402906',22,1245),(20890761,'Shad','Carroll','1997-10-25','M','4164236303',1,426),(14115521,'Thane','Mcknight','1989-09-10','M','4160260066',2,479),(25767855,'Stewart','Mullen','1974-03-13','M','4249760208',14,1068),(12391743,'Micah','Soto','1971-02-17','M','4241158986',16,1394),(24251045,'Isaac','Le','1963-05-23','M','4120532093',1,1372),(17596885,'Giacomo','Hanson','1967-12-07','M','4166764430',23,908),(13350735,'Abel','Mills','1987-12-30','M','4163280923',12,1396),(11610959,'Caleb','Wiley','1978-05-10','M','4167656841',22,1386),(19693549,'Lane','Bentley','1983-06-25','M','4160873423',7,472);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11037990,'Joseph','Mueller','1995-11-22','M','4247247214',12,386),(23759620,'Dominic','Robinson','1989-05-08','M','4129164715',4,1059),(20319356,'Akeem','Mcdonald','1966-04-10','M','4248365862',2,641),(25202963,'Xavier','Williams','1963-08-24','M','4146679035',18,992),(15343746,'Benjamin','Kent','1979-09-27','M','4164169430',10,1458),(16040977,'Robert','Ramsey','1968-02-04','M','4126143136',21,607),(14411087,'Zane','Delaney','1982-10-14','M','4242976443',3,437),(15466337,'Fulton','Guzman','1987-05-31','M','4145587266',25,1405),(17881426,'Dorian','Berry','1985-03-02','M','4125405407',13,1303),(17096075,'Hamish','Stout','1965-05-21','M','4247227492',17,853);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14315410,'Axel','Cameron','1996-03-30','M','4126796111',15,875),(22311669,'Kato','Hansen','1985-10-13','M','4164157828',11,428),(18584166,'Duncan','Gibson','1975-07-04','M','4243730151',8,1416),(16748207,'Linus','Nielsen','1967-08-17','M','4125729673',23,735),(19400600,'Kelly','Carpenter','1972-07-19','M','4128197158',6,1083),(17227681,'Chaney','White','1974-01-21','M','4143369140',21,850),(16581476,'Jelani','Long','1963-02-16','M','4143081758',17,474),(24739905,'Aidan','Le','1968-10-18','M','4165512101',13,833),(11963862,'Kato','Chaney','1986-10-21','M','4249526305',7,627),(24347158,'Ulric','Black','1969-09-27','M','4149790849',20,429);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21881162,'Boris','Dale','1997-03-23','M','4148243860',7,1115),(24054703,'Walter','Harrington','1990-04-10','M','4241923465',20,1438),(10639721,'Duncan','Cleveland','1985-10-01','M','4121301272',22,528),(18948599,'Orlando','Compton','1968-05-25','M','4164452639',12,1406),(18867251,'Colby','Carpenter','1988-03-28','M','4125216525',13,535),(20416661,'Reed','Sharp','1986-01-25','M','4160384405',21,1400),(14227227,'Martin','Hatfield','1964-05-06','M','4166242406',9,645),(22775608,'Roth','Vargas','1962-08-01','M','4241735097',18,1128),(18773389,'Elliott','Nolan','1964-03-11','M','4142310185',18,1481),(13624832,'Elton','Dyer','1989-10-30','M','4166170168',6,1036);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12997057,'Slade','Shannon','1989-04-04','M','4122240683',6,772),(12180582,'Kareem','Petersen','1962-04-11','M','4126650923',13,1115),(13055435,'Aidan','Lott','1975-06-16','M','4160171334',18,1195),(21218934,'Walker','Ashley','1962-04-07','M','4126460474',16,791),(25660162,'Aaron','Avila','1988-04-18','M','4121191569',12,1192),(23043449,'Zephania','Cote','1978-06-01','M','4245556915',21,726),(14178658,'Kadeem','Dodson','1984-05-31','M','4146423776',4,1284),(14636260,'Finn','Watson','1976-02-16','M','4246029640',25,1484),(19782358,'Wyatt','Slater','1991-06-05','M','4127702712',4,540),(24574799,'Ali','Gilmore','1982-07-29','M','4244203785',22,794);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13304998,'Drew','Mcconnell','1990-02-03','M','4161532210',8,927),(24826023,'Chase','Quinn','1965-10-11','M','4161865900',16,610),(15139373,'Andrew','Coffey','1988-05-12','M','4160816551',23,1411),(25471268,'Igor','Mathews','1980-03-10','M','4142387073',14,1241),(21376169,'Mufutau','Cohen','1977-02-18','M','4129687445',23,796),(19559423,'Victor','Pruitt','1995-12-10','M','4146149809',12,1057),(22297682,'Berk','Rose','1964-05-11','M','4121408300',21,1005),(12391223,'Harlan','Beck','1997-04-20','M','4241137446',23,1164),(12803993,'Oleg','Le','1962-10-27','M','4128446209',25,1395),(19480248,'Oleg','Farley','1987-11-24','M','4121654891',21,744);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22026599,'Bruno','Guerrero','1970-06-27','M','4242549468',23,736),(23218287,'Josiah','Sosa','1968-01-25','M','4249822247',5,1376),(21640015,'Wayne','Contreras','1986-01-29','M','4142499451',11,417),(25073731,'David','Harmon','1967-10-31','M','4161123637',5,589),(10273746,'Ezra','Vasquez','1980-10-30','M','4244099266',9,578),(14782317,'Jarrod','Nielsen','1997-02-17','M','4140895145',24,527),(10812566,'Carson','Cook','1979-11-27','M','4248041593',12,511),(16406058,'Nicholas','Silva','1973-10-16','M','4123480884',1,1327),(22364865,'John','Freeman','1996-03-13','M','4123896230',8,592),(18827914,'Colton','Pope','1985-10-16','M','4121573824',25,581);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19336978,'Oleg','Bolton','1996-08-20','M','4169760646',8,1474),(19729832,'Kadeem','Cameron','1962-08-28','M','4144077891',6,572),(12721622,'Holmes','Mitchell','1983-05-03','M','4164999974',5,1041),(12318489,'Jesse','Melendez','1967-05-31','M','4140536453',10,1063),(12662287,'Leonard','Flores','1974-04-25','M','4248938699',24,454),(16080557,'Caleb','Ward','1963-02-06','M','4246491046',24,973),(25207830,'Zahir','Moreno','1977-09-16','M','4123980620',16,1490),(17180047,'Amos','Hale','1975-03-17','M','4149815615',10,709),(25336385,'Barry','French','1971-04-08','M','4143389178',24,1298),(15146416,'Callum','Wooten','1961-03-22','M','4242883005',12,1371);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16533748,'Maxwell','Gilliam','1988-11-08','M','4147075316',12,1122),(19597936,'Nehru','Koch','1973-05-19','M','4162781371',2,574),(14231553,'Chester','Mays','1962-08-01','M','4127157346',23,933),(23732339,'Sawyer','Burris','1983-08-19','M','4147169148',3,1273),(15804286,'Paul','Lane','1962-10-31','M','4126396991',18,1099),(25951927,'Tiger','Copeland','1961-10-27','M','4124910685',10,1180),(22354374,'Phillip','Sanders','1993-01-25','M','4243471515',24,1382),(11857716,'Tyrone','Garrison','1970-12-07','M','4166205916',1,1297),(21231233,'Ira','Weber','1988-09-11','M','4124012973',1,569),(14429465,'Octavius','David','1991-07-20','M','4121454275',21,373);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14678987,'Patrick','Conner','1961-02-03','M','4249246864',13,1434),(17827478,'Preston','Watts','1985-10-10','M','4144422914',9,488),(16346690,'Shad','Tyler','1971-09-13','M','4126264897',18,1122),(17139901,'Ashton','Tran','1961-07-21','M','4243283663',24,863),(23083754,'Clark','Parrish','1994-03-08','M','4166690239',14,716),(22720622,'Evan','Cain','1989-09-25','M','4243330509',20,949),(17124658,'Thaddeus','Romero','1976-08-06','M','4169945555',4,1047),(16310356,'Eric','Richmond','1963-08-01','M','4243226482',9,888),(25226329,'Erich','Whitley','1977-11-17','M','4123916757',6,1074),(24992086,'Beck','Terrell','1992-01-13','M','4164329901',21,1014);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25244537,'Echo','Gray','1997-01-21','F','4244632927',24,695),(10258067,'Zenia','Glass','1989-07-05','F','4167373480',15,776),(10875660,'Shana','Merrill','1993-10-02','F','4163979066',9,1475),(21382903,'Miranda','Shelton','1983-07-15','F','4168123475',9,882),(10734967,'Unity','Torres','1996-11-15','F','4145245340',1,1290),(15722380,'Candice','Donaldson','1974-03-11','F','4246546625',11,695),(16908540,'Kai','Dawson','1970-06-15','F','4248298776',24,481),(21354686,'Xandra','Bryan','1968-02-15','F','4143432632',13,923),(13260574,'Shelby','Barlow','1993-09-26','F','4124803974',14,1493),(24204984,'Katell','Frazier','1969-11-11','F','4240590405',21,1140);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15930941,'Nichole','Shepherd','1967-05-19','F','4126314502',11,961),(14796188,'Genevieve','Lane','1963-01-09','F','4120438389',10,1251),(15600934,'Katell','Gross','1965-07-22','F','4143573759',1,610),(11930986,'Gisela','Alford','1992-08-03','F','4163028974',4,1331),(25550787,'Mara','Bond','1964-08-21','F','4166079676',14,907),(15582379,'Sonya','Ellis','1998-02-11','F','4160519981',18,1218),(23983925,'Brielle','Crane','1998-02-21','F','4161310212',8,1013),(14050872,'Vivien','Fischer','1983-09-28','F','4123236057',14,1023),(14920915,'Yen','Randall','1994-03-27','F','4146681748',15,1076),(21922899,'Blaine','Butler','1976-03-06','F','4140950803',21,819);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20400109,'Destiny','Kline','1989-09-18','F','4164005192',13,1037),(14547497,'Chastity','Larson','1966-04-30','F','4123975155',1,916),(24717863,'Stacy','Mccray','1975-08-19','F','4161833127',14,1173),(23261171,'Selma','Barnes','1983-12-14','F','4140756699',10,697),(12537792,'Raya','Browning','1996-08-21','F','4148615973',22,581),(23860011,'Unity','Hewitt','1961-01-27','F','4124330053',14,1356),(19786305,'Willow','Sharp','1963-05-25','F','4146417520',5,378),(23298863,'Raya','Suarez','1993-03-20','F','4247243289',13,826),(13292708,'Cally','Blackburn','1966-08-29','F','4148534657',9,990),(25416400,'Alana','Knowles','1961-02-22','F','4248296631',11,519);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24147086,'Adele','Morrow','1991-07-15','F','4166993273',8,453),(10488984,'Camille','Patel','1960-09-15','F','4242248724',19,1114),(15065729,'Melissa','Cherry','1965-08-20','F','4244037030',3,1121),(24689971,'May','Justice','1969-01-24','F','4245960801',6,415),(11567243,'Daria','Ratliff','1993-02-06','F','4243494589',17,408),(21124222,'Petra','Velez','1961-06-26','F','4120570491',4,398),(23399803,'Shea','Fernandez','1982-07-21','F','4242228559',20,1150),(14457719,'Inga','Dudley','1977-10-28','F','4167244370',24,775),(25403432,'Sierra','Duke','1990-01-05','F','4129149573',9,854),(10544967,'Camilla','Underwood','1971-07-11','F','4140754417',13,1262);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15154297,'Maite','Hebert','1989-11-05','F','4149176056',6,409),(24852578,'Jaden','Whitaker','1984-05-10','F','4168897494',23,1452),(10223570,'Linda','Aguirre','1963-07-05','F','4145983584',24,944),(14137970,'Odessa','Sykes','1961-10-18','F','4248083651',21,1065),(25373678,'Destiny','Patel','1978-08-10','F','4125358600',17,915),(15031377,'Flavia','Bray','1993-06-16','F','4120527611',25,1173),(16683745,'Sage','David','1972-10-14','F','4120072529',17,467),(21907851,'Diana','Boyer','1989-12-21','F','4249845183',10,663),(24906134,'Sydney','Petty','1972-12-07','F','4120606888',14,874),(12811465,'Belle','Burks','1963-01-26','F','4242643311',4,1308);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15500655,'Dawn','Blake','1996-04-15','F','4125518620',12,1166),(23230139,'Lenore','Cochran','1985-04-15','F','4148842310',19,690),(14432021,'Keiko','Potts','1972-06-25','F','4148853684',25,1374),(24051743,'Iris','Ellison','1964-04-19','F','4240501629',14,887),(19178789,'MacKensie','Patterson','1966-12-06','F','4146527940',4,705),(23400235,'Linda','Mcleod','1963-03-20','F','4169053992',25,811),(13394907,'Kerry','Chambers','1969-04-29','F','4169761087',6,713),(21416508,'Lillith','Lancaster','1972-03-16','F','4140368363',25,710),(23225654,'Kiara','Cotton','1987-11-20','F','4141261934',5,1405),(24359736,'Maya','Wall','1984-06-07','F','4149504540',10,1370);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17835759,'Sierra','Phelps','1981-08-27','F','4148148792',19,413),(23875113,'Ruby','Mccoy','1990-09-12','F','4143785195',25,1342),(24861904,'Scarlet','Murphy','1987-04-29','F','4167514666',17,1169),(24065940,'Martha','Shannon','1977-10-19','F','4247093140',18,1340),(11777504,'Amelia','Hurst','1976-11-10','F','4146142811',2,1441),(17353118,'Kelsey','Sloan','1967-03-17','F','4143986985',3,1029),(24963805,'Alika','Bates','1987-05-11','F','4140025299',23,1154),(12418948,'Remedios','Garrett','1992-02-11','F','4148150758',21,593),(11445638,'Aurora','Strickland','1985-01-19','F','4244197494',4,1101),(19379622,'Renee','Walls','1960-09-27','F','4163936530',7,1466);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15728200,'Anika','Nash','1964-07-21','F','4124687323',18,1404),(11532647,'Ariel','Joseph','1993-10-31','F','4240122046',17,1350),(13762570,'Florence','Gill','1964-07-02','F','4129952607',7,550),(22468353,'Glenna','Mckay','1987-10-19','F','4162091968',16,599),(14558423,'Hanae','Jarvis','1975-03-03','F','4142477332',2,718),(15349439,'Yetta','Duran','1970-02-06','F','4167937437',19,1055),(19300586,'Nomlanga','Horton','1970-03-09','F','4147139976',21,748),(24369689,'Patricia','Newman','1985-02-11','F','4246862754',6,663),(21974007,'Gemma','Hurst','1972-03-09','F','4148432853',6,593),(24426717,'Montana','Garrison','1980-12-19','F','4124609577',6,618);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12244742,'Tashya','Murphy','1984-05-22','F','4242496687',16,634),(17948164,'Kristen','Farley','1994-10-21','F','4128518458',23,768),(13254491,'Latifah','Ruiz','1985-10-25','F','4162428654',1,526),(19874710,'Maisie','Peck','1987-02-16','F','4165060656',13,492),(21569787,'Beatrice','Wall','1997-07-30','F','4122312069',3,1053),(23931909,'Lacota','Mejia','1979-06-25','F','4160260986',23,1274),(10502941,'Ebony','David','1970-03-25','F','4167835330',11,648),(12456725,'Ima','Hoover','1980-11-07','F','4142502256',9,520),(12009355,'Ivana','Mcdaniel','1963-03-01','F','4245872573',9,950),(14213683,'Maxine','Burks','1973-08-13','F','4167695818',10,786);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14310246,'Mollie','Hampton','1996-09-09','F','4149222015',25,670),(22063539,'Kendall','Moore','1996-03-05','F','4241645261',11,1067),(12745318,'Reagan','Clements','1980-03-18','F','4247619542',2,1125),(20963231,'Anne','Beard','1993-02-23','F','4166820991',8,1480),(14401261,'Aubrey','Garrett','1971-06-26','F','4242729786',4,992),(14491553,'Sybil','Bowers','1988-02-07','F','4243725362',12,464),(21270689,'Ila','Mccarthy','1970-08-04','F','4128671390',13,597),(13072577,'Larissa','Roberts','1984-10-18','F','4242074791',20,731),(16463798,'Jennifer','Pugh','1985-02-27','F','4122918424',22,617),(10762219,'Dawn','Johnston','1981-12-27','F','4127999843',21,404);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19945576,'Unity','Sellers','1983-04-29','F','4126447786',14,1052),(10137339,'Portia','Erickson','1994-03-06','F','4164237305',10,1113),(12765307,'Rowan','Hart','1976-12-04','F','4123589290',7,1142),(25073462,'Lunea','Hebert','1993-12-14','F','4144330640',4,631),(11110636,'Inga','Bailey','1981-08-15','F','4247109451',14,1026),(25776772,'Risa','Snider','1961-09-27','F','4141801617',25,366),(10326237,'Halla','Blair','1990-11-19','F','4248609888',7,875),(22264364,'Christen','Jarvis','1992-12-03','F','4247284724',25,1046),(10389054,'Quon','Mccarty','1966-04-03','F','4169444273',14,627),(17803976,'Jane','Rivera','1963-04-02','F','4148178062',3,552);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23327741,'Eliana','Morrow','1960-09-04','F','4166851652',21,730),(21766224,'Melinda','Lowe','1973-02-24','F','4121064522',14,1283),(18828339,'Kaden','Baldwin','1977-03-10','F','4243056241',14,1165),(10379129,'Ella','Harrison','1986-07-15','F','4147192243',4,871),(11478467,'Fredericka','Howard','1971-05-14','F','4129930903',16,738),(13569026,'Moana','Mcmahon','1965-01-10','F','4243576041',8,1487),(19437878,'Regan','Coffey','1986-02-25','F','4249431424',19,587),(10198072,'Xerxes','Barnett','1986-08-21','F','4128055724',12,657),(22884669,'Quincy','Pennington','1972-03-10','F','4124194659',17,409),(12233270,'Kristen','Burt','1966-07-31','F','4248562282',16,568);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13688220,'Hanna','Marsh','1983-03-21','F','4249081244',16,985),(21278963,'Jennifer','Espinoza','1983-08-04','F','4146883370',7,799),(18799381,'Clare','Davenport','1995-03-06','F','4161678247',2,623),(19756370,'Alice','Sloan','1987-09-16','F','4148330546',21,1097),(13026422,'Molly','Garrison','1984-04-19','F','4142241749',11,607),(25450913,'Blossom','Mendoza','1969-02-24','F','4247844198',23,1205),(10810072,'Mira','Hayes','1981-04-09','F','4149303613',14,551),(17895444,'Maile','Dickerson','1970-07-11','F','4166199697',12,881),(17568381,'Donna','Payne','1989-07-26','F','4162357475',2,1274),(18366662,'Lael','Arnold','1960-07-27','F','4243985290',15,1230);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25269785,'Emily','Myers','1966-10-30','F','4143332393',20,959),(24092242,'Holly','Villarreal','1977-12-16','F','4144247721',17,645),(23696006,'Germane','Bryan','1998-01-04','F','4145976136',22,1040),(18009250,'Sophia','Bowman','1965-02-02','F','4141756148',25,615),(21147421,'Hyacinth','Steele','1992-05-20','F','4246994026',20,944),(24873515,'Minerva','Kline','1963-09-20','F','4161484123',3,535),(23055750,'Mariko','Klein','1994-08-23','F','4165434617',18,571),(12197176,'Hollee','Conway','1973-03-01','F','4160898477',16,1155),(19585856,'Tanisha','Bolton','1966-06-26','F','4143154083',7,499),(25138419,'Gail','Fuentes','1991-06-06','F','4127882856',16,723);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13961688,'Erica','Hood','1964-02-14','F','4125328651',2,1356),(16077451,'Lee','Hewitt','1993-03-05','F','4166948393',20,1270),(14492889,'Chelsea','Browning','1985-05-21','F','4145652932',2,955),(15700460,'Bryar','Whitehead','1964-07-11','F','4128782073',12,601),(13154004,'Ariel','Charles','1960-10-11','F','4127901342',18,866),(20533919,'Danielle','Powers','1963-12-14','F','4168904136',3,1496),(25824447,'Maia','Lara','1962-06-08','F','4166860851',22,467),(14934586,'Penelope','Hobbs','1963-09-24','F','4121583306',12,1476),(16635201,'Brenna','Cummings','1963-10-11','F','4141711220',16,1444),(21931780,'Tatyana','Mullen','1975-08-13','F','4163369048',24,1443);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17334465,'Vivien','Sheppard','1977-11-12','F','4161038737',1,714),(19418307,'Kitra','Morse','1983-11-13','F','4244862780',16,949),(12278048,'Wanda','Buckley','1996-01-14','F','4243978504',19,479),(14932731,'Camilla','Wiggins','1982-05-26','F','4243795895',19,1196),(25012323,'Guinevere','Collins','1992-04-13','F','4249226287',20,1412),(12160662,'Ebony','Arnold','1961-09-22','F','4148460874',8,946),(16155609,'Inez','Fuentes','1969-02-03','F','4148599076',14,718),(24817818,'Sigourney','Briggs','1984-11-18','F','4144326516',6,552),(16515349,'Christen','Hendricks','1994-06-27','F','4243993739',23,1094),(10653851,'Megan','Hendricks','1980-01-05','F','4144449731',23,1097);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18905737,'Geraldine','Johns','1987-09-04','F','4123398555',24,1362),(16659019,'Gay','Roberts','1998-03-28','F','4124157189',25,800),(14309923,'Hiroko','Best','1993-07-15','F','4149195686',19,983),(19954029,'Maisie','Morris','1972-07-17','F','4241743854',2,1121),(21983662,'Shoshana','Ayala','1981-01-08','F','4142658357',15,945),(25186950,'Irene','Dalton','1971-12-18','F','4127832782',4,1457),(16442134,'Jada','Fields','1996-11-01','F','4162369352',16,586),(13844714,'Chastity','Mack','1996-09-29','F','4144482437',1,1252),(18902327,'Yoko','Schwartz','1989-12-16','F','4247680791',16,775),(10899968,'Ashely','Grant','1978-07-25','F','4146892813',18,1405);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13047294,'Hedda','Franco','1986-05-19','F','4127104976',15,876),(18106475,'Chiquita','Robertson','1964-07-25','F','4121626659',25,760),(25968223,'Marah','Pruitt','1970-07-25','F','4145379795',16,1191),(21800019,'Echo','Silva','1987-05-09','F','4145375015',19,1213),(23412627,'Xantha','Patterson','1960-07-25','F','4162667556',16,597),(11088642,'Isabella','Reid','1988-04-07','F','4240485151',7,1454),(17009689,'McKenzie','Morton','1964-07-11','F','4243586435',17,1368),(12813715,'Constance','Powers','1976-07-23','F','4169916848',7,1203),(17242146,'Regan','Wiley','1971-04-09','F','4240205851',5,506),(20144437,'Joy','Allison','1984-05-11','F','4124195593',21,426);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10530044,'Erin','Carrillo','1962-11-20','F','4128306866',3,1474),(22749138,'Quincy','Russell','1979-09-12','F','4143053042',1,536),(18319941,'Olympia','Tanner','1965-12-01','F','4148025453',22,1318),(16502178,'Penelope','Phillips','1998-03-03','F','4244958152',14,720),(23641268,'Virginia','Reese','1980-09-24','F','4167198653',17,1367),(23488159,'Virginia','Lancaster','1963-04-19','F','4142743594',6,1351),(16745888,'Inga','Moses','1998-03-30','F','4121066680',13,800),(22942284,'TaShya','Stewart','1965-12-23','F','4120369720',12,369),(24683725,'Riley','Mccormick','1962-11-27','F','4245719172',21,1455),(11636126,'Stella','Pugh','1996-05-25','F','4241108788',16,1245);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21241651,'Ginger','Maxwell','1966-09-21','F','4246247998',7,1011),(10164534,'Jacqueline','Flynn','1977-05-13','F','4246239951',13,379),(15088134,'Rama','Torres','1974-11-20','F','4129828367',6,1389),(20744946,'Jada','William','1977-03-14','F','4248631488',15,1389),(16254542,'Hyacinth','Knapp','1987-05-09','F','4162742662',9,554),(23767583,'Hollee','Carpenter','1997-11-21','F','4245380322',24,498),(20518529,'Dai','Fulton','1960-08-29','F','4242814713',23,1278),(20374662,'MacKenzie','Lancaster','1967-11-07','F','4167787079',11,803),(18548325,'Kellie','Branch','1987-07-09','F','4161053891',21,981),(10699389,'Regina','Parsons','1989-09-25','F','4143673664',8,1421);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11333538,'Isabella','Pickett','1963-01-31','F','4124908932',13,372),(17210119,'Cameron','Holmes','1991-05-24','F','4121189230',8,794),(12322465,'Audra','Stephenson','1972-11-24','F','4241358348',8,729),(20139883,'Cheyenne','Colon','1998-04-26','F','4249500493',12,480),(13998854,'Lani','Wagner','1962-07-24','F','4128702640',25,1317),(15801181,'Aubrey','Mcdowell','1998-05-15','F','4160921234',15,405),(25124414,'Nevada','Church','1990-04-30','F','4147307623',17,902),(18958848,'Cameron','Cobb','1984-07-26','F','4161224263',6,941),(12010621,'Kelly','Schwartz','1976-03-06','F','4141469432',1,462),(16200046,'Sheila','Mcfarland','1969-11-02','F','4167630523',15,522);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18343017,'Karleigh','Cameron','1993-02-02','F','4147530192',21,1395),(22124765,'Beverly','Matthews','1964-03-17','F','4246771517',2,783),(25565360,'Amaya','Roy','1975-03-19','F','4167149689',24,1260),(14322629,'Rhea','Parsons','1987-12-04','F','4142888807',4,1275),(10501722,'Ina','Pickett','1985-12-27','F','4121874418',14,773),(20949168,'Amanda','Burton','1966-10-22','F','4243807624',9,548),(24103646,'Dana','Hensley','1996-05-29','F','4121834872',7,1460),(19023467,'Tana','Barlow','1984-11-27','F','4121041875',3,631),(20358585,'Jescie','Bean','1989-08-03','F','4127228271',5,788),(18057460,'Heidi','Hoover','1964-01-07','F','4146670515',2,417);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10458077,'Cheryl','Avery','1962-09-13','F','4168048709',12,854),(25434475,'Martina','Delgado','1979-09-07','F','4242065699',8,709),(13503431,'Iliana','Preston','1997-06-04','F','4141601490',9,830),(17931153,'Lilah','Lowery','1964-08-20','F','4143056301',8,791),(13470462,'Halee','Bentley','1984-08-16','F','4121356473',18,1454),(22895175,'Jenette','Dunn','1987-09-26','F','4249597451',1,625),(22697130,'Ivy','Riggs','1971-12-14','F','4149879140',6,1312),(20148834,'Heather','Hogan','1977-01-30','F','4168474759',11,860),(17575318,'Tashya','Sawyer','1982-08-07','F','4143758806',5,1441),(23281668,'Alexandra','Rice','1974-03-08','F','4145714348',4,1456);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12322220,'Jade','Everett','1971-07-04','F','4143677426',7,965),(10096240,'Natalie','Patton','1978-12-16','F','4248701594',12,765),(11609652,'Serena','Jackson','1973-02-07','F','4168239913',20,473),(15353037,'Cameran','Hoffman','1996-08-30','F','4140686274',8,1070),(25633276,'Hollee','Glenn','1985-08-24','F','4161956956',7,666),(16924868,'Kay','Workman','1977-12-09','F','4240860727',14,1286),(15246829,'Lesley','Kelley','1962-10-11','F','4249506178',4,1448),(14663696,'Ariel','Woodward','1980-10-15','F','4163344687',5,755),(11038921,'Winter','Wade','1968-11-30','F','4243102597',15,1182),(19643506,'Rowan','Holmes','1998-02-15','F','4146622532',11,1450);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17147573,'Hyacinth','Barrera','1962-10-25','F','4163919705',19,917),(10110409,'Venus','Blackwell','1994-09-12','F','4248557107',20,708),(16319634,'Blair','Grimes','1977-06-22','F','4161478137',13,1092),(18955877,'Clementine','Hopkins','1985-10-09','F','4125419243',17,770),(10490927,'Olga','Glass','1985-01-01','F','4128625900',20,1189),(12230073,'Suki','Banks','1973-05-28','F','4127075372',8,992),(23420862,'Oprah','Powers','1970-02-27','F','4122384457',3,1465),(17768676,'Erin','Ray','1993-10-05','F','4163239285',25,1442),(10125644,'Patience','Riddle','1968-08-07','F','4167846997',4,1031),(21968469,'Genevieve','Donovan','1975-01-12','F','4140568205',5,1087);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10850107,'Mercedes','Ford','1987-03-01','F','4128193303',18,1240),(18438105,'Cara','Garrett','1982-01-31','F','4144657171',22,809),(22994255,'Lila','Calhoun','1966-08-22','F','4126942892',4,1124),(15766169,'Halla','Watts','1990-01-24','F','4168397471',25,1447),(24108391,'Yael','Snow','1983-03-17','F','4169206419',7,756),(17711317,'Ariel','Bennett','1965-09-01','F','4161155291',18,1244),(10164227,'Maryam','Hurley','1989-01-31','F','4167369770',2,416),(12819901,'Bryar','Paul','1964-02-23','F','4243151650',22,1302),(13533513,'Noel','Sargent','1997-08-26','F','4168605406',7,1442),(14549356,'Ulla','Noble','1979-02-25','F','4161893102',24,623);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23452060,'Lila','Yang','1971-07-21','F','4241380778',2,1024),(21938267,'Astra','Sharpe','1977-04-25','F','4148702321',12,1310),(24199830,'Isadora','Jarvis','1983-02-01','F','4148053020',18,876),(10651577,'Dawn','Trujillo','1969-10-24','F','4166571666',18,830),(22007852,'Angelica','Farrell','1969-08-15','F','4141474956',15,576),(23808540,'Helen','Floyd','1972-05-17','F','4125438926',15,1062),(15772987,'Suki','Copeland','1978-10-02','F','4122304121',18,370),(24921159,'Daryl','Rogers','1982-03-08','F','4161411152',3,951),(16108107,'Amela','Baird','1993-12-29','F','4122427382',13,386),(24632727,'Cassandra','Cooley','1990-08-16','F','4164194309',20,1310);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12534697,'Vanna','Rodriquez','1989-01-23','F','4123323391',18,694),(21417874,'Roary','Dunn','1998-05-08','F','4248461211',17,1432),(12169516,'Yvonne','Crawford','1989-12-26','F','4129033202',21,745),(15572720,'Maia','Travis','1985-02-14','F','4163558559',6,859),(13844409,'Gloria','Grimes','1993-08-12','F','4249979278',15,1436),(14160748,'Amber','Sandoval','1986-12-21','F','4249336002',4,956),(16760533,'Bo','Woods','1979-10-01','F','4142029346',1,773),(24048537,'Zena','Barber','1980-05-16','F','4166721132',20,1016),(22348160,'Melodie','Jensen','1975-09-04','F','4142794902',22,926),(25659146,'Regina','Macias','1990-11-25','F','4127518375',13,1346);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11099641,'Ocean','Vega','1990-11-23','F','4145984651',2,1074),(10360532,'Vivien','Delacruz','1992-06-06','F','4142907173',19,539),(20572095,'Amy','Blake','1990-10-28','F','4144914916',16,570),(21672433,'Adena','Hart','1960-11-28','F','4145374755',18,940),(15407050,'Nelle','Gamble','1971-01-05','F','4248703005',23,515),(14198762,'Noelle','Welch','1963-11-16','F','4246778091',7,1100),(19418819,'Mariam','Nicholson','1971-07-14','F','4147628283',5,809),(16087117,'Haley','Wall','1967-03-04','F','4129699543',13,383),(24161861,'Blair','Nieves','1996-03-22','F','4121904101',2,894),(22047003,'Ramona','Coleman','1978-07-01','F','4141273747',20,1020);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16081500,'Sara','Holt','1961-05-09','F','4122665116',9,1347),(10861412,'Chanda','Morris','1975-02-01','F','4128549883',10,1096),(13797735,'Libby','Shelton','1960-06-08','F','4241054099',22,828),(18497166,'Hyacinth','Hahn','1968-12-30','F','4166970462',15,803),(20927705,'Raya','Banks','1989-01-02','F','4126362056',4,1400),(20515621,'Tanya','Acevedo','1986-11-14','F','4141220011',21,1211),(15563493,'Anjolie','Bean','1962-05-21','F','4166778881',22,964),(20962912,'Macy','Rosales','1973-01-14','F','4144872255',5,1436),(22623238,'Lacy','Glenn','1994-09-08','F','4244374965',20,490),(24697275,'Pascale','Townsend','1988-03-06','F','4129179568',10,1360);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19701793,'Melvin','Armstrong','1976-10-21','M','4144012074',7,891),(14831316,'Micah','Manning','1990-10-04','M','4248398612',13,1074),(18091268,'Aristotle','Jefferson','1984-09-26','M','4246142779',13,1114),(23381093,'Connor','Pearson','1979-09-01','M','4240109813',9,1072),(21929709,'Reed','Fleming','1997-09-06','M','4165138616',23,556),(12226035,'Carter','Mcknight','1993-02-28','M','4127730865',16,1344),(16131532,'Fritz','Neal','1987-01-31','M','4161365078',8,781),(21668933,'Alexander','Padilla','1978-09-30','M','4248246973',24,654),(12638109,'Dennis','Wilcox','1961-04-08','M','4149198883',13,1120),(24445432,'Walter','Huffman','1981-05-26','M','4246458418',20,1019);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21334167,'Julian','Bender','1969-10-22','M','4246824386',18,1286),(17703022,'Elijah','William','1981-02-28','M','4142670006',6,1135),(13378130,'Reed','Acevedo','1983-02-07','M','4242519989',2,864),(19676127,'Caldwell','Moon','1964-05-31','M','4140838401',25,1256),(10799084,'Ralph','Young','1991-08-06','M','4149817428',25,442),(22882279,'Xavier','Malone','1997-09-15','M','4244035345',1,791),(19599770,'Thane','Barnes','1979-11-09','M','4122651589',20,1432),(24737161,'Brody','Lindsey','1982-03-21','M','4243172475',13,640),(20376022,'Allen','Hampton','1968-11-14','M','4143912554',5,612),(21069266,'Beck','Barry','1962-04-14','M','4160556118',4,1386);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23923555,'Elijah','White','1993-06-03','M','4165184421',19,1069),(25899520,'Calvin','Jefferson','1985-02-14','M','4124492045',5,1079),(13795870,'Driscoll','Odonnell','1983-07-07','M','4169178615',10,1234),(11811628,'Carlos','Blackburn','1968-12-02','M','4142354546',23,1154),(19602274,'Joel','Chaney','1979-01-18','M','4142773798',6,656),(17208601,'Jonah','Short','1980-08-23','M','4245414218',10,612),(25169077,'Grant','Simpson','1963-02-20','M','4140054264',1,1457),(20098733,'Steven','Carey','1992-08-26','M','4169254403',4,1203),(23309541,'Kenyon','Osborne','1979-11-09','M','4148553632',6,1458),(12530393,'Elijah','Hood','1983-10-14','M','4128294198',20,939);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15925989,'Tate','Floyd','1985-05-19','M','4160565816',5,822),(20174913,'Camden','Payne','1971-07-08','M','4148220007',11,1336),(21749250,'Jesse','Byrd','1971-01-05','M','4143727697',24,913),(16931101,'Porter','Meyer','1980-05-21','M','4245670184',14,861),(17671597,'Ronan','Grimes','1974-01-28','M','4167514117',19,1474),(22915014,'Ronan','Leonard','1971-10-27','M','4125283496',6,854),(20104886,'Abbot','Moses','1989-11-25','M','4163275438',11,928),(23979677,'Callum','Mcgowan','1966-03-27','M','4240723695',9,1068),(22121598,'Scott','Page','1970-06-07','M','4148080799',6,1231),(10012235,'Camden','Berry','1981-11-14','M','4142359329',7,1113);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21140916,'Kamal','Bonner','1974-08-19','M','4164648533',10,722),(24422503,'Mannix','Farrell','1979-03-10','M','4246191309',7,692),(21181535,'Wyatt','Hooper','1987-05-23','M','4126358583',2,578),(14249967,'Seth','Rice','1996-05-25','M','4169102125',22,1124),(12174663,'Silas','Cooley','1995-11-06','M','4162756268',15,552),(23522246,'Finn','Larsen','1983-12-28','M','4245231159',14,388),(13912372,'Ralph','Fitzgerald','1997-10-02','M','4240430576',23,806),(19928530,'Gray','Fulton','1983-06-30','M','4249164615',20,467),(19170064,'Clinton','May','1967-04-03','M','4126242249',9,1453),(23654726,'Allen','Goodman','1966-10-18','M','4147602633',15,1319);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15080386,'Thane','Farley','1983-03-13','M','4141859152',5,1139),(24875652,'Mason','Mcgowan','1961-02-03','M','4241056820',3,890),(22271766,'Nicholas','Pace','1974-06-23','M','4242372143',2,975),(20506473,'Kasper','Gordon','1994-11-27','M','4144632712',22,1387),(22235456,'Phelan','Murphy','1990-02-13','M','4148570563',16,1228),(17336640,'Stone','Young','1966-11-15','M','4160673712',9,1204),(16985503,'Knox','Osborne','1972-12-08','M','4163457175',3,685),(19447048,'Myles','Olsen','1988-09-27','M','4160369578',2,709),(17427665,'Fletcher','Britt','1966-02-02','M','4121252183',4,1358),(25538727,'Christian','Henson','1994-05-02','M','4141107919',10,483);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21450439,'Joel','Bonner','1972-07-14','M','4166449369',12,775),(23420636,'Hasad','Dillon','1986-09-06','M','4167882597',4,1341),(14490495,'Valentine','Owen','1982-07-31','M','4164157001',11,1412),(16716549,'Vincent','Mccullough','1996-05-11','M','4169042943',17,385),(12080813,'Theodore','Roberts','1967-04-10','M','4125269991',3,830),(21250783,'Tanner','Sosa','1981-02-18','M','4125999175',24,437),(21389862,'Tyrone','Gallagher','1990-07-22','M','4247310981',20,1273),(19642777,'Amir','Mcbride','1998-01-28','M','4149027462',11,1199),(23816779,'Demetrius','Thompson','1987-08-17','M','4246522542',10,696),(13944953,'Nash','Leonard','1982-04-23','M','4140127493',12,939);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12035723,'Addison','Spears','1986-01-29','M','4160842130',15,1476),(15651897,'Xander','Dorsey','1982-03-25','M','4161869183',15,1059),(25833324,'Noble','Neal','1976-02-10','M','4242901460',18,445),(16851899,'Luke','Mcgee','1980-08-21','M','4167829566',6,385),(12455006,'Vaughan','Witt','1977-12-22','M','4129401771',23,832),(18223345,'Bruce','Dodson','1974-03-25','M','4127059104',4,880),(14886859,'Malcolm','Gentry','1988-05-03','M','4242125556',15,1222),(23978733,'Kennan','Mcneil','1974-05-02','M','4122213030',20,420),(19765060,'Zeus','Hood','1984-12-25','M','4242127886',13,500),(12884091,'Tiger','Crosby','1971-08-29','M','4168555356',9,718);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23605123,'Jeremy','Foley','1989-11-07','M','4147364185',12,412),(10743788,'Mark','Maddox','1986-12-17','M','4146430648',15,897),(10454518,'Yuli','Cummings','1965-09-22','M','4122365368',7,570),(17206696,'Vladimir','Ramsey','1970-06-27','M','4125797820',7,1273),(25358568,'Avram','Beasley','1980-12-16','M','4162588872',18,563),(14875304,'Ezra','Hoover','1969-08-12','M','4247310093',18,834),(10019204,'Perry','Clay','1985-12-15','M','4242746319',19,736),(25079395,'Mannix','English','1992-08-13','M','4144069808',19,932),(18801195,'Merritt','Irwin','1963-09-11','M','4163831695',15,1441),(25912710,'Declan','Snyder','1995-10-21','M','4248457106',10,717);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19284728,'Honorato','Espinoza','1982-09-09','M','4141593562',14,383),(11421298,'Brady','Compton','1965-10-01','M','4244402516',13,913),(15605648,'Marshall','Joseph','1978-11-09','M','4147739556',7,1344),(11887676,'Wade','Bauer','1980-12-21','M','4144066372',21,464),(19727790,'Owen','Serrano','1961-07-03','M','4168736821',2,992),(10750626,'Jacob','Rowe','1991-06-25','M','4165739431',23,1239),(11887524,'Nolan','Espinoza','1970-07-17','M','4122236690',19,756),(17331715,'Aidan','Hogan','1983-06-27','M','4248846145',25,1247),(20638506,'Theodore','Abbott','1986-01-06','M','4141979892',21,925),(24663062,'Gannon','Lara','1984-12-07','M','4169099716',19,1322);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17603705,'Craig','Higgins','1966-12-28','M','4168918277',13,1048),(21788908,'Colby','Mccray','1982-02-27','M','4240503867',5,874),(24467891,'Reese','Carr','1975-01-10','M','4141044970',3,487),(19168248,'Aaron','Mclaughlin','1980-08-09','M','4141596657',18,1044),(10765300,'Elton','Ford','1975-03-08','M','4124966395',24,403),(13170928,'Upton','Brady','1984-12-14','M','4147527896',12,760),(16736174,'Marvin','Sawyer','1974-09-04','M','4144363715',21,946),(18381792,'Porter','Gilbert','1973-02-10','M','4169550477',19,595),(25342481,'Mark','Levy','1976-12-15','M','4141033847',16,394),(20518505,'Price','Hardin','1973-02-10','M','4146723331',8,889);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11193822,'Octavius','Sharp','1969-08-25','M','4242159738',17,970),(17047799,'Ali','Ballard','1985-10-10','M','4249269503',11,652),(25426367,'Chaney','Austin','1992-07-30','M','4126748612',23,1259),(21238036,'Lamar','Pickett','1990-05-16','M','4162205375',18,837),(21456077,'Julian','Larson','1968-07-04','M','4120017931',8,1338),(25456944,'Vernon','Ingram','1975-08-12','M','4121198715',3,817),(18163079,'Patrick','Gallegos','1989-02-18','M','4148135068',14,734),(12342690,'John','Mckee','1990-01-27','M','4123015017',12,471),(17376445,'Cyrus','Prince','1961-07-23','M','4241172746',3,631),(16334837,'Elijah','Savage','1986-02-21','M','4124067359',15,705);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12010798,'Dante','Coleman','1970-07-07','M','4248843221',9,1091),(15844627,'Slade','Frye','1977-09-20','M','4242076787',10,1102),(13474339,'Nigel','Preston','1990-12-19','M','4240215703',22,471),(19562813,'Cain','Fields','1996-04-26','M','4163131199',14,1225),(12625324,'Gil','Weaver','1984-09-21','M','4126726768',25,521),(16480923,'Lev','Curry','1968-07-29','M','4249687204',14,685),(22152571,'Marsden','Mills','1993-11-19','M','4242002056',7,1386),(10814818,'Herman','Giles','1969-02-05','M','4164530338',10,478),(13933679,'Magee','Dickerson','1963-11-02','M','4162923877',11,389),(12835358,'Levi','Scott','1992-10-23','M','4164138643',23,648);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18983348,'Clinton','Hayes','1981-03-06','M','4144511244',4,754),(17256486,'Clinton','Mcgee','1975-02-03','M','4140913437',7,1284),(25707129,'Macaulay','Rosa','1986-08-16','M','4129566994',18,604),(18142045,'Amir','Flores','1988-02-23','M','4242182250',12,957),(11993605,'Sawyer','Joyner','1963-07-21','M','4167301375',25,742),(12961364,'Sebastian','Padilla','1989-09-25','M','4120547594',15,508),(10043156,'Nicholas','Owen','1984-05-28','M','4166338170',16,738),(17031242,'Mannix','Kirby','1994-09-05','M','4147977783',17,866),(16951022,'Graham','Rios','1980-06-16','M','4120389386',18,914),(13535893,'Ryder','Kelley','1976-11-03','M','4248657914',12,599);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10875838,'Fuller','Silva','1990-02-16','M','4129669962',14,1158),(11552985,'Alexander','Clarke','1983-03-26','M','4165912142',18,1290),(19613270,'Jin','Powell','1990-09-19','M','4163019376',4,1110),(10893503,'Carlos','Adams','1989-09-06','M','4123312402',21,700),(16400953,'Alfonso','Stein','1973-01-22','M','4122058445',2,448),(21912957,'Sebastian','Mathews','1981-08-18','M','4126122349',11,899),(15870987,'Nissim','Mendoza','1979-09-28','M','4140967533',17,629),(20002378,'Arthur','Hawkins','1966-08-03','M','4121245365',23,1057),(15377099,'Walker','Rush','1965-09-01','M','4148514003',24,450),(20452255,'Leroy','Bell','1968-08-08','M','4246784274',13,1082);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10012931,'Norman','Buchanan','1961-03-07','M','4162032654',16,1433),(18417386,'Chaim','Pearson','1976-05-09','M','4124869590',25,1218),(12110627,'Clinton','Knox','1961-03-22','M','4122393528',13,1125),(14886289,'Darius','Pittman','1988-06-09','M','4125045824',1,792),(25431433,'Tyrone','Ochoa','1966-11-10','M','4245652985',25,1486),(19686131,'Christopher','Payne','1984-10-11','M','4140548974',18,540),(25514623,'Perry','Lynch','1991-01-27','M','4249722033',9,1201),(20384714,'Vernon','Johnston','1991-02-24','M','4141940634',7,1445),(25280740,'Rooney','Hamilton','1972-05-23','M','4140478402',12,1338),(15885062,'Elijah','Ayers','1961-09-24','M','4147260334',11,1215);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20972493,'Luke','Lawrence','1975-03-10','M','4243818933',9,1127),(18738685,'Palmer','Bauer','1983-04-17','M','4166885298',16,505),(15416056,'Avram','Morris','1965-01-13','M','4160241149',16,641),(24699361,'Brennan','Tucker','1980-03-12','M','4249929381',3,1335),(11933269,'Ulric','Dillon','1997-05-28','M','4167159649',17,598),(16521152,'Isaiah','Nguyen','1971-02-06','M','4125873695',1,814),(17352223,'Gareth','Curtis','1971-07-23','M','4125413917',9,1397),(24530756,'Tanek','Carver','1965-06-20','M','4243957887',19,662),(19409264,'Shad','Copeland','1977-09-30','M','4129867607',2,1347),(23969881,'Fulton','Barron','1961-12-18','M','4147840296',19,1441);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13979900,'Omar','Cardenas','1960-11-13','M','4160996399',8,840),(25538319,'Sebastian','Huber','1994-05-07','M','4126783393',7,1495),(13374302,'Tiger','Owen','1974-10-18','M','4241837828',13,811),(20117769,'Troy','Best','1995-02-17','M','4163132172',9,1414),(15214681,'Sylvester','Chen','1964-06-11','M','4164114280',6,910),(16276537,'Nash','Rhodes','1997-12-11','M','4127969610',7,563),(14280065,'Guy','Lane','1993-09-04','M','4164850437',3,1202),(13901424,'Micah','Joseph','1967-11-26','M','4248942478',15,1261),(23864144,'Clarke','Walters','1978-08-13','M','4164331247',13,1292),(23448141,'Chase','Bates','1976-02-07','M','4124929780',2,623);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20144245,'Henry','Frazier','1966-12-06','M','4166116570',19,1268),(16604496,'Hakeem','Marshall','1963-09-09','M','4249607491',11,733),(10230746,'Dalton','Giles','1967-04-06','M','4140750364',4,455),(23783449,'Carl','Paul','1964-02-05','M','4162098594',13,1242),(19706274,'Kenneth','Santana','1980-01-05','M','4148207688',3,1127),(17239163,'Christopher','Heath','1964-06-19','M','4169781554',13,608),(23911306,'Tad','Lynn','1974-09-02','M','4123126903',10,1211),(21480109,'Phelan','Holland','1975-04-02','M','4123053691',2,373),(12902931,'Timothy','Joyce','1996-04-08','M','4161455982',14,751),(13332322,'Vincent','Simon','1973-10-26','M','4245627149',24,886);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19096619,'Marshall','Brewer','1989-06-17','M','4128099809',5,1199),(15387842,'Camden','William','1968-06-11','M','4163485452',15,920),(12498282,'Valentine','Bennett','1973-02-12','M','4242228925',20,928),(21666838,'Ferris','Savage','1981-03-01','M','4241061354',6,611),(16052059,'Calvin','Lawson','1967-05-26','M','4146048438',20,407),(23002010,'Cyrus','Nguyen','1962-09-14','M','4249708387',18,425),(24538651,'Akeem','Jenkins','1961-09-28','M','4124094694',10,946),(21324608,'Lane','Chavez','1972-06-12','M','4165815665',13,1300),(17151743,'Ira','Shaffer','1989-03-18','M','4242111451',25,867),(16574443,'Myles','Morse','1997-03-19','M','4165879930',15,554);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13762898,'Alec','Salazar','1968-10-01','M','4143442018',4,1394),(14845315,'Graiden','Cannon','1992-09-30','M','4149942628',25,1135),(23624983,'Zane','Johns','1961-05-18','M','4124868759',21,1150),(18532594,'Oscar','Hopkins','1995-04-28','M','4243939686',23,964),(18722703,'Brandon','Reilly','1990-03-29','M','4164632747',14,597),(18079125,'Macaulay','Gray','1997-10-28','M','4121676297',18,1085),(19717312,'Lewis','Frazier','1965-08-25','M','4149332629',15,947),(11253178,'Elijah','Pacheco','1973-05-17','M','4143252059',23,768),(11972112,'Hall','Dejesus','1989-10-10','M','4164296226',19,946),(10555260,'Nicholas','Bentley','1987-12-06','M','4244655026',7,367);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10854785,'Joshua','Russo','1966-05-01','M','4243687477',18,1064),(18110279,'Berk','Mason','1967-03-14','M','4123315714',22,406),(13933859,'Malachi','Serrano','1963-09-19','M','4149270865',21,1012),(18429607,'Lionel','George','1968-07-26','M','4243971634',9,671),(21383136,'Edward','Whitaker','1998-03-25','M','4169076988',6,791),(10487200,'Lawrence','Barrera','1968-06-13','M','4247140632',23,1306),(22584133,'Nero','Wright','1997-01-04','M','4167424146',21,951),(21961425,'Ishmael','Huber','1966-06-27','M','4241628737',2,1225),(16397363,'Geoffrey','Green','1962-03-22','M','4245919218',1,1014),(19335686,'Ishmael','Ortega','1990-08-15','M','4123006265',1,1136);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12701669,'Dale','Olsen','1969-06-19','M','4146326764',20,1187),(15146151,'Mohammad','Gonzales','1969-04-12','M','4246682058',23,936),(18265607,'Steven','George','1990-08-08','M','4144902527',18,1157),(23226448,'Quamar','Marshall','1964-01-24','M','4246394959',15,631),(11748642,'Brennan','York','1983-01-15','M','4147135483',10,1299),(23192892,'Kasper','Medina','1970-09-30','M','4162137420',15,794),(25150214,'Ulysses','Barnett','1971-02-09','M','4145531942',9,729),(22027144,'Xavier','Ortega','1976-05-23','M','4161785942',11,450),(14318737,'Dominic','Diaz','1995-11-04','M','4241164124',8,749),(18517354,'Ross','Le','1995-07-05','M','4244039159',22,935);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11386853,'Nicholas','Rowe','1964-07-29','M','4143697335',23,1135),(14968032,'Caldwell','Juarez','1972-12-20','M','4160226976',17,557),(15141052,'Brian','Sosa','1969-12-23','M','4247682480',25,524),(21887959,'Justin','Sherman','1978-02-24','M','4122569934',5,1140),(20691659,'Raphael','Lucas','1983-07-29','M','4121091654',1,1401),(19031862,'Paki','Good','1975-04-28','M','4245867240',14,563),(11184867,'Adam','Garrison','1968-06-12','M','4169084436',24,1419),(12428234,'Joshua','Carney','1976-06-17','M','4241320813',22,1001),(11700045,'Fulton','Patel','1990-12-10','M','4167312935',12,678),(15712578,'Malachi','Stark','1961-07-05','M','4148065830',12,1128);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14417444,'Marshall','Hahn','1969-07-24','M','4123579563',10,455),(13802565,'Ronan','Willis','1978-11-10','M','4128003806',22,1116),(24824290,'Carlos','Baxter','1972-12-05','M','4126895389',25,1078),(19322134,'Bradley','Rios','1983-01-20','M','4147352118',19,1289),(13542507,'Richard','Cole','1990-12-03','M','4246407002',6,1028),(14719940,'Anthony','Greene','1961-04-03','M','4143461460',22,407),(17915464,'Christopher','Walters','1962-04-18','M','4162352806',11,943),(11163900,'Alfonso','Hendrix','1997-03-14','M','4143663750',8,1473),(18638563,'Fletcher','Yates','1990-02-07','M','4126220739',13,535),(23277519,'Kuame','Riggs','1980-04-06','M','4243541591',20,870);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23029662,'Oren','Church','1976-12-10','M','4128807658',14,1344),(13866245,'Geoffrey','Velazquez','1984-02-07','M','4126688691',11,1261),(24952132,'Abbot','Richard','1970-11-09','M','4241311964',10,1059),(19517487,'Christopher','Mclean','1972-02-18','M','4162949768',18,643),(17005764,'Sean','Wilcox','1978-05-08','M','4142240877',20,1244),(16330486,'Jermaine','Sawyer','1979-07-03','M','4169943698',2,777),(25988425,'Shad','Dixon','1979-02-05','M','4122349064',22,529),(24683065,'Lane','Key','1970-07-14','M','4124510451',15,598),(19021283,'Jordan','Holcomb','1997-02-13','M','4123235470',24,1343),(13610844,'Levi','Walls','1962-10-17','M','4124277712',16,1264);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12263867,'Elliott','Torres','1973-03-04','M','4129995460',20,1201),(14361938,'Aaron','Barron','1962-07-24','M','4144787332',19,704),(16488194,'Bruce','Pugh','1997-07-07','M','4145351959',13,633),(19015074,'Lewis','Atkins','1975-07-30','M','4144071729',5,1488),(12147814,'Beck','Dale','1975-04-09','M','4243413444',1,1464),(10056523,'Hiram','Stark','1976-10-11','M','4168548869',2,681),(12221262,'Drew','Shelton','1965-01-08','M','4121486956',23,1262),(23441611,'Isaac','Rice','1967-08-03','M','4249503510',3,1221),(14092791,'Elton','Bailey','1995-09-26','M','4145881170',2,1495),(11131284,'Brendan','Odonnell','1963-04-28','M','4141647822',11,1425);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18498933,'Carson','Cruz','1988-05-29','M','4140104029',22,888),(16043047,'Ian','Good','1986-09-15','M','4169198085',4,1237),(25251794,'Keith','Morrow','1971-09-13','M','4124400394',19,1203),(23817094,'Sean','Cabrera','1964-05-11','M','4126364226',11,1183),(18315538,'Ferdinand','Robbins','1973-11-02','M','4147600242',10,1072),(15082617,'Nathaniel','Navarro','1998-04-07','M','4245605959',11,1332),(16206756,'Edward','Conley','1995-01-13','M','4243135469',20,653),(22511099,'Tiger','Melton','1976-01-21','M','4244589349',17,404),(17643091,'Tiger','Valentine','1991-08-15','M','4166577490',17,554),(17623448,'Arsenio','Rosales','1987-02-12','M','4160450023',2,469);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21552964,'Zephania','Patton','1990-05-09','M','4125792303',17,1142),(25280191,'Zephania','Whitehead','1976-03-09','M','4245131942',11,548),(22231433,'Darius','Levine','1962-08-25','M','4162719616',22,625),(22116870,'Theodore','Giles','1964-08-18','M','4144393898',10,1333),(23977815,'Phillip','Downs','1994-05-12','M','4161590631',5,607),(22859267,'Justin','Chaney','1984-03-09','M','4143742348',5,1169),(21471290,'Len','Mcdaniel','1981-11-02','M','4247829838',17,381),(16370642,'Harding','Leblanc','1979-12-15','M','4149746654',14,679),(19943498,'Jack','Howell','1979-03-20','M','4246102153',17,498),(10146644,'Yuli','Espinoza','1973-08-03','M','4243798093',14,416);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21914628,'Dean','Franks','1981-07-27','M','4128391757',11,1208),(12087022,'Cullen','Calderon','1986-01-14','M','4146227402',4,474),(12861850,'Samuel','Nolan','1964-11-18','M','4162139921',13,770),(14439581,'Curran','Wilkerson','1985-03-05','M','4140149831',20,968),(14863527,'Anthony','Dunlap','1989-11-18','M','4149722576',13,1094),(17572676,'Berk','Casey','1988-04-20','M','4245354746',18,631),(12143348,'Clarke','Leach','1991-03-23','M','4166914632',5,382),(25795467,'Felix','Fletcher','1979-10-22','M','4145700975',19,414),(13630544,'Blaze','Santiago','1981-11-06','M','4164298661',1,868),(13559764,'Chadwick','Burgess','1971-12-26','M','4129833787',11,818);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23998646,'Quin','Case','1971-02-14','F','4145627368',21,673),(11999642,'Xena','Love','1966-12-17','F','4146100321',5,989),(10446834,'Macy','Pate','1979-06-07','F','4140934261',24,455),(12008231,'Camilla','Mullins','1960-10-01','F','4160204009',12,861),(22131260,'Mira','Lynn','1983-02-17','F','4144155463',2,963),(24560363,'Leigh','Schultz','1965-01-17','F','4162386222',2,1288),(24265229,'Calista','Cole','1976-10-29','F','4245280212',9,1327),(25550114,'Gillian','Best','1975-07-25','F','4127561809',6,553),(14537785,'Riley','Holland','1997-10-24','F','4121783894',21,862),(10587488,'Maite','Donovan','1974-04-09','F','4245039130',10,604);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18610884,'Desirae','Barrera','1966-12-12','F','4141493016',10,1260),(16081854,'Uta','Ball','1964-10-04','F','4128804171',16,1315),(23987509,'Macey','Combs','1963-08-08','F','4144625475',20,854),(11855039,'Sopoline','Spears','1982-07-31','F','4145084074',4,1233),(24597357,'Alea','Meadows','1993-12-18','F','4143977852',7,1341),(24458679,'Audrey','Lopez','1960-11-26','F','4246786663',5,373),(10803502,'Blaine','Witt','1962-06-25','F','4242325181',14,1380),(19927877,'Minerva','Fuller','1975-02-21','F','4161976588',3,1058),(12327787,'Roary','Roberts','1967-12-04','F','4168342034',3,511),(19422907,'Ila','Howard','1982-10-20','F','4245003474',6,641);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10858201,'Jaden','Duke','1976-08-19','F','4247873135',22,567),(19732648,'Maxine','Maldonado','1977-02-18','F','4147209505',19,1434),(17401867,'Grace','Ferguson','1967-01-09','F','4121130710',4,746),(12641474,'Lunea','Caldwell','1970-10-06','F','4146404924',3,749),(16679968,'Robin','Washington','1974-02-18','F','4148557968',2,1424),(14794513,'Teagan','Miranda','1970-04-04','F','4129619831',19,1059),(10450851,'Justine','Campbell','1990-02-22','F','4147135528',14,442),(13263508,'Illiana','Mcmillan','1971-05-18','F','4160302686',20,1373),(20041576,'Montana','Simpson','1992-11-29','F','4164429123',10,1317),(17796823,'Blythe','Owens','1990-07-31','F','4125179860',22,524);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21330210,'Anika','Gallegos','1962-10-23','F','4125259795',23,935),(21143701,'Sybill','Gibson','1963-02-14','F','4248884985',11,633),(13812471,'Roanna','Crane','1991-06-21','F','4245337760',15,609),(24984435,'Maggie','Webb','1967-11-24','F','4240696270',4,519),(23129121,'Marah','Powell','1977-09-28','F','4123567925',13,1252),(25148665,'Patricia','Nixon','1970-07-19','F','4242361516',19,379),(13482842,'Melissa','Hunt','1968-06-24','F','4244163383',24,705),(22073933,'Lael','Cardenas','1980-06-20','F','4164750128',5,1314),(12010701,'Willa','Black','1974-06-12','F','4146866396',3,880),(12238292,'Miriam','Shepard','1978-01-04','F','4249377426',16,1100);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20258657,'Kiayada','Mathis','1978-07-27','F','4241641615',14,1082),(11954687,'Adele','Mcintosh','1970-09-21','F','4121031330',13,805),(24498761,'Cassidy','Kirkland','1987-07-20','F','4163728205',11,1424),(15929116,'Breanna','Aguirre','1990-03-23','F','4142820109',21,833),(18911498,'Kyra','Best','1967-05-15','F','4249807520',22,870),(12773100,'Desiree','Merritt','1966-08-16','F','4126444830',24,709),(10479796,'Rowan','Jenkins','1975-05-06','F','4162043591',10,1348),(22720961,'Ariel','Suarez','1975-04-18','F','4143114203',15,1281),(15375819,'Selma','Huffman','1972-03-14','F','4126008046',9,1295),(16014592,'Shana','Brady','1993-02-02','F','4147809696',19,594);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21597124,'Sade','Johnson','1996-07-20','F','4245198553',2,497),(10066727,'Caryn','England','1988-10-10','F','4167636830',22,490),(13887564,'Brenda','Hart','1964-03-19','F','4144084800',11,499),(22225128,'Marcia','Griffin','1973-10-27','F','4140779713',25,608),(17014792,'Risa','Bridges','1985-08-07','F','4161767446',8,377),(22179663,'Alana','Nguyen','1965-05-09','F','4240388174',8,471),(19331673,'Kimberley','Bray','1969-01-26','F','4122084698',21,1481),(25162042,'Katelyn','Brewer','1970-10-01','F','4124411572',20,523),(25773089,'Indira','Wagner','1971-12-03','F','4141659923',4,434),(13338249,'Bertha','Snider','1968-01-24','F','4123158328',13,1172);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18163723,'Adrienne','Odonnell','1996-07-24','F','4148234411',2,875),(13108209,'Paloma','Reeves','1971-09-22','F','4245385047',6,452),(15393347,'Ariel','Mayo','1967-08-02','F','4129913414',15,379),(16480243,'Erica','Berg','1962-08-09','F','4141582291',4,535),(19653336,'Lee','Aguirre','1987-03-21','F','4128539500',6,1240),(17476067,'Daria','Bradford','1972-07-01','F','4160785971',12,898),(21508644,'Patricia','Colon','1977-03-14','F','4241228605',12,1018),(15548442,'Idola','Cox','1972-06-15','F','4167455013',20,524),(22330644,'Isadora','Richardson','1996-04-05','F','4140234045',15,1364),(11330508,'Ayanna','Taylor','1968-08-16','F','4160652676',3,1388);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23902182,'Germaine','Atkins','1991-08-05','F','4163567320',11,1248),(22082426,'Wanda','James','1984-12-08','F','4246489419',20,1083),(20244017,'Wilma','Oconnor','1977-02-21','F','4127837518',20,410),(17949756,'Nichole','Blackwell','1979-01-19','F','4169980623',4,970),(14180705,'Alisa','Bradshaw','1996-07-30','F','4163405270',25,1157),(12978953,'Jaden','Stanton','1963-10-22','F','4162314637',21,824),(22545135,'Sydney','Robles','1975-10-15','F','4161396697',5,1034),(18967101,'Abra','Lee','1995-10-03','F','4127546032',18,579),(21522940,'Macey','Wyatt','1979-11-13','F','4148100743',10,1179),(11233400,'Maisie','Wiggins','1977-09-21','F','4242680462',22,1059);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12188818,'Donna','Ingram','1969-10-20','F','4241856146',23,1081),(25879775,'Anne','Ford','1980-05-01','F','4161463604',25,871),(13013870,'Amethyst','Daniels','1990-12-09','F','4248243784',3,1075),(13550863,'Bertha','Macias','1973-12-26','F','4129594708',8,817),(17693280,'Lavinia','Conner','1969-09-26','F','4149524713',22,728),(20637955,'Madonna','Byers','1989-01-26','F','4120358450',1,1082),(10139197,'Paloma','Berg','1990-01-08','F','4244492587',17,512),(14298435,'Jena','York','1978-06-23','F','4163893812',5,1140),(14033358,'Frances','Holmes','1977-11-06','F','4149480025',22,978),(18872219,'Lillith','Morris','1980-09-14','F','4145804077',10,1309);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24930521,'Ruth','Pierce','1964-12-20','F','4242003839',1,1233),(17827336,'Wendy','Velazquez','1988-06-30','F','4141917377',12,508),(25512724,'Rinah','Lynch','1995-12-15','F','4147205047',2,1378),(24691380,'Zoe','Savage','1967-05-22','F','4123946343',15,839),(15909593,'Kyra','Webb','1988-05-31','F','4120288882',20,708),(22073881,'Kirestin','Bender','1998-01-07','F','4141996695',4,556),(19858948,'Marcia','Callahan','1988-07-25','F','4149763253',6,445),(13650112,'Marcia','Huffman','1965-08-22','F','4144120800',5,1388),(24086337,'Zia','Caldwell','1972-04-05','F','4141719046',23,728),(20943938,'Larissa','Snow','1983-02-11','F','4243705591',18,1110);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12809965,'Courtney','Lara','1992-05-09','F','4167086566',3,572),(23940224,'Adele','Yates','1971-07-31','F','4169138083',12,1070),(17553639,'Yen','Abbott','1989-12-24','F','4142775748',19,789),(18142018,'Velma','Henry','1965-12-26','F','4129387061',7,1066),(25151671,'Blythe','Lynn','1988-09-25','F','4122487588',20,1011),(22319186,'Tamara','Hansen','1966-01-22','F','4246133305',14,491),(19656157,'Angela','Buchanan','1989-01-21','F','4241416623',11,671),(22333958,'Nina','Ayers','1971-12-29','F','4241687328',6,1135),(22616818,'Joelle','Carey','1997-07-09','F','4146088543',25,1331),(18673247,'Jessamine','Sellers','1988-12-22','F','4127039827',14,1197);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18391746,'Miranda','Nieves','1964-09-25','F','4160335803',6,381),(21988368,'Tasha','Nelson','1984-04-14','F','4163343514',12,412),(18883894,'Heather','Curtis','1990-11-01','F','4168500681',16,447),(25929669,'Jayme','Snow','1968-08-15','F','4242104934',7,906),(20650486,'Shoshana','Ryan','1960-06-26','F','4245961294',20,811),(17375725,'Ria','Bass','1991-11-19','F','4162357203',13,1382),(17432044,'Yuri','Barlow','1967-04-08','F','4248115033',10,1239),(12674554,'Aphrodite','Mccullough','1982-07-10','F','4166455899',1,371),(22363786,'Kitra','Kirk','1973-09-29','F','4148941921',25,1283),(18151886,'Jessamine','Preston','1980-03-06','F','4245755538',13,499);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25424185,'Xantha','Neal','1978-03-15','F','4149953154',3,440),(22001990,'September','Parrish','1968-12-19','F','4143524567',16,395),(11156020,'Geraldine','Gilmore','1987-03-26','F','4126837193',23,1251),(12349642,'Mariam','Pollard','1963-12-12','F','4169773767',8,1480),(12086878,'Hedda','Black','1968-05-03','F','4242317099',12,1080),(16148806,'Illiana','Huff','1979-10-18','F','4125464031',11,1491),(17730420,'Iliana','Randall','1981-09-01','F','4123867438',3,1292),(11277485,'Jenette','Morgan','1964-08-24','F','4149211267',23,635),(14777808,'Bell','Franco','1986-03-19','F','4165547576',6,1375),(21277118,'Maryam','Church','1962-11-10','F','4161370693',13,1252);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17710356,'Jemima','Vincent','1985-07-28','F','4247198539',10,1054),(14353505,'Sydnee','Mckay','1994-12-23','F','4127098579',17,958),(22190937,'Portia','Sexton','1962-02-26','F','4128869681',6,692),(11428336,'Leandra','Blair','1991-08-01','F','4128877113',2,389),(25971579,'Constance','Mueller','1964-01-08','F','4243646651',24,741),(24088013,'Zelenia','Myers','1991-11-12','F','4120463875',4,1304),(11991085,'Margaret','York','1985-02-20','F','4249648922',17,621),(11656000,'Amelia','Hansen','1989-04-13','F','4122146760',8,906),(25916762,'Nayda','Palmer','1969-02-17','F','4245306531',15,939),(10811812,'Macy','Miranda','1996-09-05','F','4142640941',1,1200);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19248288,'Quon','Blackwell','1994-03-04','F','4246989414',20,1115),(21264390,'Basia','Fischer','1986-04-18','F','4143098915',14,418),(18947985,'Anastasia','Mcmillan','1966-06-04','F','4245213076',21,1172),(14265762,'Doris','Allen','1988-05-10','F','4148406028',8,1049),(22061015,'Sonya','Baird','1975-09-16','F','4127559529',13,1273),(25877378,'Dara','Potts','1966-11-04','F','4249773284',24,1072),(15421098,'Joy','Hamilton','1998-04-27','F','4165845577',11,473),(16901165,'Willow','Clay','1968-11-16','F','4129539363',8,1033),(13540286,'Tashya','Hall','1965-06-12','F','4160731893',13,590),(10363893,'Liberty','Benjamin','1962-09-18','F','4125989189',20,383);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16902507,'Genevieve','Jacobs','1974-06-22','F','4129517985',22,1449),(17945251,'Maryam','Burton','1988-03-24','F','4125473390',15,564),(19108516,'Sylvia','Saunders','1975-04-15','F','4169854736',7,1083),(18021802,'Madeline','Moody','1966-03-31','F','4243371127',14,1262),(20918695,'Heather','Adams','1977-09-29','F','4145190718',6,522),(21622014,'Aiko','Murray','1992-05-22','F','4142890139',17,888),(15386694,'Cassady','Nelson','1984-04-05','F','4246186217',10,1422),(12254481,'Idona','Roach','1976-01-05','F','4149071552',18,1330),(15222272,'Ivory','Crosby','1975-05-07','F','4121061623',3,645),(22263132,'Florence','Acevedo','1983-10-18','F','4168592113',17,1215);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17024785,'Autumn','Mcdaniel','1963-01-27','F','4245440228',9,930),(14343990,'Haley','Mercado','1975-08-09','F','4128313967',6,413),(19616608,'Rachel','Goff','1989-08-30','F','4245060273',3,448),(25151325,'Indigo','Snow','1971-01-09','F','4144818494',9,1340),(23347660,'Bertha','Kidd','1971-12-23','F','4248742529',6,1196),(17452942,'Blossom','Duran','1965-07-20','F','4123699047',13,842),(19709900,'Ariel','Acosta','1996-06-23','F','4144656154',5,819),(24623802,'Xyla','Donovan','1992-05-20','F','4122968243',14,586),(18895170,'Chloe','Rojas','1997-02-27','F','4248594166',22,1466),(10963248,'Nevada','Weber','1991-10-21','F','4128728382',24,759);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18253426,'Katell','Wilkerson','1974-01-19','F','4249009516',12,752),(20327850,'Jordan','Guthrie','1972-12-02','F','4249576060',22,839),(17030931,'Casey','Mcconnell','1970-01-13','F','4120372100',17,477),(14230895,'Janna','Oliver','1962-01-18','F','4248863433',17,1248),(23642258,'Colleen','Sweeney','1988-07-03','F','4247073412',14,491),(14714800,'Ayanna','Mcclain','1982-05-06','F','4248876397',7,1166),(17070197,'Eugenia','Morrison','1984-08-15','F','4128871699',25,1008),(25321057,'Shay','Rivas','1968-06-22','F','4168590654',4,1429),(10729349,'Nicole','Dale','1997-07-03','F','4168297753',13,722),(19149839,'Alexandra','Blevins','1967-02-25','F','4248039789',1,411);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17294302,'Blaine','Hughes','1974-08-15','F','4123015648',1,954),(23120928,'Pandora','Andrews','1960-06-09','F','4244559198',24,511),(24635077,'Adena','Macdonald','1985-12-04','F','4164567128',8,663),(10469467,'Kirestin','Gomez','1969-01-19','F','4127320169',4,1069),(12857172,'Imani','Cummings','1995-10-15','F','4248180710',4,437),(19539871,'Scarlett','Reese','1971-12-12','F','4246513909',21,1106),(23520659,'Jena','Love','1996-01-07','F','4121801193',21,599),(17091933,'Kylynn','Montoya','1973-08-13','F','4162153372',5,445),(13830766,'Taylor','Glenn','1968-07-31','F','4128880534',22,682),(25115110,'Mikayla','Noble','1993-04-13','F','4120718164',15,469);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18925805,'Yoshi','Lowe','1960-08-19','F','4242784518',2,1302),(10598285,'May','Larsen','1976-11-28','F','4125180486',15,1248),(10302591,'Lisandra','Mayer','1996-05-05','F','4144243230',20,765),(21740674,'September','Chang','1983-06-10','F','4161054968',17,1413),(16307884,'Eugenia','Watkins','1961-05-08','F','4164809244',10,1325),(25380694,'Dara','Mcdonald','1989-02-13','F','4243714075',9,1145),(24631633,'Eve','Mcdonald','1997-07-04','F','4247149242',7,385),(22751731,'Jeanette','Russo','1969-06-07','F','4160217741',14,1076),(10561178,'Lareina','Joyce','1972-04-10','F','4129972641',13,1486),(12319331,'Kevyn','Bauer','1990-01-27','F','4120931065',14,1184);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18201412,'Lareina','Meyer','1960-08-27','F','4247310288',5,825),(24849800,'Rebecca','Conway','1983-06-28','F','4166368874',1,1014),(15734530,'Alfreda','Foley','1976-04-14','F','4163817153',9,711),(24572867,'Stella','Davenport','1970-09-22','F','4122338274',22,734),(10248739,'Rhona','Pena','1992-07-26','F','4146644400',17,1425),(12613196,'Yael','Moses','1968-06-23','F','4123479282',13,640),(12351879,'Libby','Maxwell','1993-04-04','F','4241314056',16,522),(21194525,'Brynne','Wyatt','1976-11-01','F','4240345012',5,1094),(20243046,'Xena','Holt','1965-07-16','F','4242920775',8,950),(17144863,'Whoopi','Pruitt','1982-04-22','F','4144947175',14,1214);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10416140,'Bianca','Boyd','1969-05-04','F','4140527777',4,894),(22579781,'Breanna','Sanford','1973-04-24','F','4160906182',2,475),(19584149,'Tara','Morgan','1973-02-16','F','4248479333',23,633),(15061679,'Leslie','Bowen','1991-10-30','F','4141777715',3,611),(23257858,'Mari','Trevino','1994-06-04','F','4166331007',17,683),(21835959,'Susan','Long','1981-03-03','F','4143724530',22,987),(14273358,'Zenaida','Gates','1993-12-21','F','4246274998',2,818),(15499625,'Joan','Bolton','1971-08-06','F','4121090964',25,1002),(10270751,'Brynn','Beasley','1976-11-28','F','4128695908',1,1159),(12412305,'Nell','Page','1982-10-01','F','4148843300',8,451);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21268036,'Rosalyn','Palmer','1977-12-16','F','4167263607',23,565),(24073397,'Charlotte','Stone','1993-02-07','F','4247746857',21,1195),(20559184,'Nomlanga','French','1988-07-01','F','4243401171',23,1268),(18707976,'Buffy','Gilliam','1997-03-21','F','4140158645',18,656),(10346774,'Alika','Macdonald','1982-08-04','F','4245714583',2,1295),(11093698,'Carissa','Bowman','1960-07-25','F','4241865716',22,682),(24228210,'Xantha','Mcintosh','1987-08-16','F','4161806746',10,518),(22012031,'Destiny','Sharpe','1996-12-02','F','4243497161',25,500),(16652436,'Jenette','Mckenzie','1984-12-05','F','4246853049',13,1452),(19074457,'Dai','Newton','1968-06-29','F','4128638085',18,466);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17369583,'Hayfa','Strickland','1963-10-23','F','4168627428',1,370),(22436681,'Bo','Ingram','1972-09-16','F','4240030344',24,1080),(15357610,'Mechelle','Doyle','1983-03-17','F','4125830552',7,1462),(10103939,'Myra','Bishop','1971-01-13','F','4126800823',10,669),(22931056,'Rose','Sparks','1989-02-03','F','4125023807',17,479),(15464071,'Lenore','Buchanan','1996-02-05','F','4245676483',19,675),(12647142,'Lacy','Richardson','1988-12-15','F','4160010459',22,1381),(12713025,'Shannon','Alexander','1992-09-17','F','4123354868',21,828),(13351816,'Xena','Watkins','1997-05-26','F','4126606617',2,714),(11217344,'Urielle','Benjamin','1963-01-07','F','4142547514',8,371);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17768001,'Maxine','Stuart','1982-09-18','F','4162512455',18,1088),(13385309,'Kelly','Fuller','1990-11-26','F','4140436929',8,1050),(11058573,'Aspen','Thornton','1992-08-18','F','4128965708',24,668),(10079038,'Jacqueline','Clements','1988-01-10','F','4143701222',24,593),(19191404,'Bethany','Kirkland','1979-04-27','F','4127312816',7,815),(11782478,'Melanie','Hayden','1961-11-20','F','4163162786',8,831),(21886336,'Noelle','Fuller','1982-03-21','F','4149628111',18,958),(20472071,'Inga','Barnes','1989-08-26','F','4249055709',12,630),(25398009,'Veda','Guerra','1968-04-10','F','4167380875',1,866),(14974080,'MacKenzie','Collier','1965-10-02','F','4145412195',15,1297);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15851350,'Jennifer','Santos','1968-06-27','F','4128710160',15,1339),(17855683,'Carly','Willis','1963-11-17','F','4143411322',8,1009),(16463953,'Gretchen','Harris','1992-07-31','F','4149865438',6,814),(24991726,'Lenore','Franklin','1968-06-20','F','4120417991',2,1375),(12395347,'Inez','Paul','1965-04-06','F','4244322391',2,914),(13790967,'Lisandra','Bruce','1962-11-29','F','4165607390',17,416),(10444806,'Judith','Sharp','1992-11-14','F','4160768284',23,1022),(17151713,'Cleo','Montoya','1981-06-24','F','4126510260',24,1329),(23339119,'Irene','Buckley','1969-07-15','F','4149975121',21,1198),(25243428,'Aretha','Velasquez','1970-10-21','F','4143352850',10,1137);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20798644,'Sheila','Parks','1994-08-02','F','4166208660',9,946),(17058322,'Lydia','Perry','1964-06-14','F','4161857993',2,809),(10699910,'Wendy','Butler','1983-03-28','F','4241604426',23,775),(20540679,'Abigail','Byrd','1998-04-21','F','4144098079',19,1142),(24524813,'Quail','Ortega','1976-10-21','F','4146493179',6,989),(25669504,'Audrey','Gillespie','1985-08-21','F','4140714824',9,921),(18675214,'Leandra','Luna','1978-05-07','F','4163475931',12,795),(18517290,'Madeline','Fitzpatrick','1972-09-03','F','4147990775',22,527),(12491938,'Christen','Gay','1981-08-09','F','4129106396',24,1260),(11935807,'Piper','Macdonald','1995-11-15','F','4163586214',23,1498);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16636716,'Emily','Mccormick','1997-11-07','F','4124757394',9,1441),(10926184,'Jasmine','Erickson','1997-01-27','F','4123759247',24,415),(23209629,'Rina','Hansen','1963-12-07','F','4164669785',5,939),(10256846,'Daryl','Daniels','1964-06-23','F','4243335637',22,491),(25015310,'Quincy','Zimmerman','1984-06-05','F','4146426229',23,1481),(25647346,'Naomi','Clemons','1971-06-22','F','4166330322',14,671),(22065197,'Judith','Neal','1991-02-02','F','4245193016',25,898),(18943597,'Alma','Lawrence','1981-11-14','F','4144436344',5,669),(16716894,'Hedy','Pacheco','1992-06-24','F','4122496398',18,608),(16887537,'Marny','Poole','1964-11-14','F','4147043868',8,1241);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24067763,'Buffy','Thomas','1972-08-13','F','4162836850',20,840),(16548786,'Heather','Bowers','1975-08-14','F','4243931525',20,875),(25779897,'Lavinia','Sharpe','1979-04-03','F','4142593631',1,1206),(13956738,'Leslie','Glover','1989-06-12','F','4141872857',5,733),(21964290,'Ori','Ellison','1983-02-21','F','4129169261',11,1105),(18912787,'Kiara','May','1964-09-19','F','4126034365',1,396),(15327536,'Mari','Bailey','1983-05-10','F','4244417955',23,1288),(11370375,'Jemima','Gonzales','1980-03-23','F','4167464512',5,884),(23234260,'Naida','Cooper','1976-02-18','F','4123340474',20,679),(11711881,'Camilla','Vang','1961-07-08','F','4128343319',17,639);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19590208,'Rae','Chambers','1973-12-05','F','4128804791',8,935),(17632419,'Ella','Merritt','1960-12-22','F','4240440040',13,554),(14856440,'Kaden','Petersen','1967-03-12','F','4248033011',14,1160),(18384092,'Kylan','Horton','1970-02-28','F','4249764112',4,940),(18533422,'Leila','Meadows','1963-09-15','F','4126831612',21,1272),(23009775,'Rina','Jacobs','1994-03-09','F','4168382675',1,538),(22058327,'Kyla','Washington','1965-05-04','F','4123910964',20,1211),(15729084,'Uma','Maddox','1987-10-13','F','4126950846',1,1239),(14653659,'Kerry','Santiago','1986-09-28','F','4146084653',24,1095),(25914947,'Ivy','Chandler','1961-07-03','F','4140896583',6,473);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18660244,'Carly','Gamble','1964-01-17','F','4169629971',1,1380),(17995253,'September','Hansen','1974-05-12','F','4140353437',2,392),(18884062,'Kylynn','Bailey','1982-03-29','F','4168869513',10,483),(20128176,'Jemima','Warren','1962-10-04','F','4145950586',23,928),(19816825,'Galena','Pacheco','1989-08-26','F','4166990527',17,1200),(23807589,'Sopoline','Nash','1969-11-25','F','4247955102',23,593),(23802567,'Lani','Lawrence','1969-06-26','F','4248330860',1,434),(13015124,'Quemby','Fisher','1978-03-07','F','4128805879',17,1044),(15356614,'Jade','Peters','1983-06-25','F','4245245440',22,754),(25338451,'Chava','Forbes','1993-04-20','F','4245145661',1,537);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16707480,'Iona','Bradley','1975-10-11','F','4147379255',23,1451),(14595584,'Sonia','Bauer','1981-08-10','F','4127539763',17,702),(17289490,'Fleur','Tucker','1976-09-15','F','4247071349',3,1279),(10087160,'Rina','Hutchinson','1963-06-22','F','4245310844',22,569),(14530800,'Rhiannon','Durham','1995-04-08','F','4162318907',11,512),(15424080,'Lois','Doyle','1971-01-19','F','4127836543',20,378),(17348129,'Sopoline','Mays','1962-01-23','F','4168175780',12,1166),(19867398,'Linda','Fowler','1990-01-04','F','4240929299',14,960),(16485891,'Skyler','Meyer','1966-01-13','F','4167101982',6,851),(11760976,'Gay','Greene','1997-11-09','F','4120353200',24,1443);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25246044,'Jemima','Delgado','1961-04-12','F','4161467165',6,1135),(13490438,'Velma','Frank','1962-04-28','F','4163050588',6,977),(24296886,'Megan','Soto','1969-06-30','F','4245826782',16,998),(16975948,'Leah','Walton','1971-03-29','F','4168076455',19,733),(22709956,'Odessa','Jenkins','1986-08-01','F','4126238657',8,419),(12934655,'Lara','Kirby','1984-03-26','F','4126754911',21,775),(15063221,'Jessamine','Downs','1986-03-22','F','4123665528',7,1394),(10553034,'Emily','Lester','1969-11-09','F','4169466998',15,838),(24097009,'Shea','Calderon','1961-02-12','F','4241771219',12,364),(11559722,'Rinah','Wilson','1963-03-02','F','4240478928',9,1172);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12989857,'Kameko','Hunt','1975-08-30','F','4145375664',11,748),(17015219,'Wynne','Owens','1994-02-23','F','4246530090',20,1054),(24670378,'Stella','Kerr','1997-07-14','F','4148028986',6,1208),(11351567,'Nita','Olsen','1992-06-27','F','4129017363',24,530),(23037629,'Maxine','Wheeler','1983-07-28','F','4143999877',4,1394),(20342096,'Sheila','Poole','1979-11-16','F','4169040063',16,1156),(15193769,'Olivia','Bradley','1989-02-13','F','4162221272',15,469),(10025767,'Victoria','Swanson','1971-09-29','F','4241623852',11,950),(18811341,'Rose','Witt','1981-12-24','F','4240160979',20,1360),(13408422,'Blythe','Dodson','1963-08-09','F','4148377370',14,912);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25397162,'Elizabeth','Campbell','1995-05-26','F','4164359395',13,1023),(19740394,'Rae','Morris','1975-10-02','F','4246437426',3,855),(21805307,'Joan','Morrow','1962-04-08','F','4249479754',1,496),(10830758,'Chava','Cochran','1965-02-04','F','4147006801',6,415),(15130762,'Kylan','Thornton','1968-12-23','F','4167425857',24,622),(17628149,'Stacy','Nolan','1986-03-05','F','4241875017',4,771),(13468109,'Janna','Kim','1965-12-06','F','4140794168',7,511),(17127305,'Eve','Chambers','1962-08-27','F','4249294817',8,1431),(19215636,'Jana','Adkins','1983-01-05','F','4242089439',24,1175),(21481450,'Emi','Briggs','1963-05-12','F','4146199987',15,1367);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25669237,'Tatum','Gomez','1963-11-11','F','4129627994',15,833),(16210495,'Tana','Stevenson','1984-11-26','F','4164607223',22,577),(25943433,'Kameko','Randall','1983-10-25','F','4169734134',20,532),(11206852,'Cameran','Nash','1962-12-21','F','4249314105',6,1487),(20303976,'Ivory','Richardson','1978-02-04','F','4148452329',15,1330),(16456638,'Aiko','Weeks','1970-04-04','F','4168118173',14,1168),(22588088,'Hedy','Mcgowan','1968-07-06','F','4240558180',7,752),(24077930,'Elizabeth','Valentine','1972-12-24','F','4122029830',19,1352),(20239266,'Lillian','Hendrix','1972-06-30','F','4124977952',16,1249),(21010671,'Nyssa','Wagner','1997-08-21','F','4241214447',21,380);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11725871,'Indigo','Stanley','1973-12-10','F','4125915654',2,496),(24716353,'Kerry','Weeks','1969-06-06','F','4242176568',7,520),(22804690,'Fatima','Lloyd','1964-12-07','F','4244574182',11,834),(12144491,'April','Farrell','1988-10-18','F','4168868548',22,898),(23709673,'Sybil','West','1992-07-01','F','4142653907',7,1409),(18123439,'Ursula','Mooney','1978-02-20','F','4166191466',24,1246),(12201821,'Lucy','Mueller','1983-04-29','F','4164786149',15,1023),(20505280,'Jescie','Guerrero','1991-12-20','F','4149936507',24,919),(11262998,'Portia','Sims','1963-08-07','F','4149723488',2,1000),(15827625,'Elizabeth','Richards','1992-03-05','F','4126547218',19,730);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21250615,'Denise','Morin','1961-08-30','F','4144675245',17,1299),(17224952,'Quincy','Dunn','1988-11-05','F','4246324791',3,696),(11368204,'Melyssa','Wilkins','1963-11-20','F','4162665258',5,1093),(17210354,'Holly','Bender','1965-01-06','F','4245264433',2,868),(14905298,'Cameran','Steele','1995-05-13','F','4240109178',2,615),(18432389,'Fay','Mckee','1978-02-10','F','4145971618',8,839),(22751642,'Rina','Wilder','1979-08-01','F','4129159619',16,918),(13104786,'Eve','Casey','1971-02-27','F','4120852571',9,1241),(21830900,'Halla','Poole','1985-07-13','F','4160269838',22,1236),(23462721,'Yeo','Chandler','1964-09-18','F','4243115519',4,1456);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16746123,'Katell','Rodriguez','1980-06-22','F','4123855756',24,987),(17162780,'Zelenia','Diaz','1967-11-01','F','4149233920',14,966),(12431576,'Irene','Alexander','1994-06-02','F','4167372828',4,636),(14844289,'Basia','Ferrell','1983-09-15','F','4167659269',23,535),(23606428,'Vivian','Steele','1966-04-29','F','4165795641',14,937),(20091796,'Nora','Owens','1988-10-28','F','4243446815',15,632),(19559806,'Portia','Black','1990-02-01','F','4123455621',2,796),(25594480,'Cailin','Foster','1987-06-03','F','4168364164',24,1294),(12624514,'Ocean','Copeland','1997-01-05','F','4163882345',12,971),(14154460,'Kaitlin','Pace','1996-09-08','F','4241273876',13,691);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13982074,'Cailin','Johnson','1994-07-08','F','4240924274',10,776),(13635885,'Mary','Dickson','1993-09-08','F','4246465584',23,1090),(16529984,'Kristen','Rocha','1992-09-13','F','4147935907',4,1234),(25614700,'Yuri','Hurley','1994-07-02','F','4245894686',12,550),(16615630,'Azalia','Stokes','1996-09-16','F','4129833734',23,1292),(24469068,'Lilah','Webb','1982-09-07','F','4120295976',21,761),(24418104,'Charissa','Dixon','1967-04-09','F','4129711002',16,1302),(10863223,'Jordan','Hill','1973-07-28','F','4240082063',16,468),(17559573,'Ruth','Townsend','1987-07-01','F','4142484523',4,1065),(20036008,'Donna','Valencia','1991-11-01','F','4149542172',2,757);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15937200,'Lucas','Cardenas','1982-07-18','M','4248043221',12,976),(15768826,'Ira','Keith','1981-03-25','M','4244204358',25,623),(18477828,'Jack','Hancock','1969-08-13','M','4125734015',10,420),(22402369,'Jermaine','Page','1976-05-19','M','4124868330',9,1261),(21411458,'Kenyon','Todd','1979-05-19','M','4246016446',16,935),(11332046,'Garrett','Griffith','1966-03-03','M','4241368361',10,714),(13664509,'Otto','Zimmerman','1990-05-10','M','4167477965',6,381),(24143096,'Eagan','Velasquez','1995-04-29','M','4149166661',13,659),(24375514,'Kasper','Blackwell','1992-12-29','M','4124861549',16,806),(11585588,'Forrest','Woods','1981-09-07','M','4244193528',22,1284);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22139732,'Rafael','Briggs','1997-06-23','M','4163260400',5,957),(13569366,'Samson','Brown','1993-03-01','M','4160019579',3,535),(20479210,'Emerson','Burris','1977-01-07','M','4247857769',13,1030),(13304469,'Kamal','Wiley','1976-08-27','M','4129452338',12,769),(12670305,'Magee','Hutchinson','1963-07-23','M','4248445408',17,396),(17984143,'Buckminster','Berg','1962-03-01','M','4142098798',19,1139),(25097100,'Odysseus','Faulkner','1983-06-29','M','4148541721',3,1224),(12321495,'Zephania','Miranda','1995-11-04','M','4122221723',14,817),(22528284,'Mufutau','Sharp','1973-05-27','M','4123747535',19,1489),(15445845,'Andrew','Byrd','1981-05-03','M','4126924946',6,1369);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23988451,'Michael','Pitts','1980-02-07','M','4245158816',14,1375),(23387623,'Henry','Stark','1995-11-09','M','4167716628',9,796),(16767154,'Keith','Knox','1997-05-07','M','4146484342',21,733),(18006214,'Alvin','Cross','1985-06-17','M','4123933048',24,697),(18578232,'Lucas','Lloyd','1988-04-25','M','4120604059',16,1283),(17650726,'Wang','Donaldson','1965-09-12','M','4169081921',16,853),(15751377,'Cole','Delaney','1966-03-07','M','4247776587',17,1070),(11450574,'Drew','Roberts','1990-06-26','M','4249522366',16,523),(14455521,'Elmo','Poole','1988-01-18','M','4166159073',11,972),(13710076,'Quinn','Whitney','1973-03-17','M','4160052017',1,467);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17868234,'Gregory','Monroe','1962-12-06','M','4121657456',17,1162),(17163218,'Jin','Parker','1985-06-07','M','4144374716',6,1285),(16979222,'Yardley','Prince','1979-02-08','M','4128658722',8,428),(24282659,'Elijah','Hogan','1974-08-12','M','4245108889',12,748),(20890005,'Joseph','Flynn','1962-08-08','M','4143558088',11,382),(10528793,'Otto','Marsh','1963-02-12','M','4247783908',8,471),(20153521,'Austin','Hendrix','1977-10-25','M','4123366537',11,1138),(17426974,'Keegan','Kane','1993-11-09','M','4165266289',5,839),(13233881,'Troy','Petersen','1991-05-27','M','4245894965',6,443),(12567604,'Drake','Owen','1965-11-09','M','4126937089',19,681);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20293310,'Carson','Sullivan','1968-02-25','M','4245397165',9,816),(16868369,'Carson','Nguyen','1962-10-14','M','4249522147',6,623),(17338549,'Richard','Sanford','1988-09-15','M','4243124266',5,425),(21843609,'Tyler','Montgomery','1969-04-13','M','4243251121',10,790),(13554370,'Brady','Allen','1975-04-18','M','4124792481',19,1383),(19732979,'Kennan','Mosley','1974-12-02','M','4124364971',11,793),(18977903,'Acton','Phelps','1996-02-23','M','4243548952',16,1299),(13038408,'Igor','Berger','1960-11-10','M','4141298638',2,526),(15126010,'Tarik','Bartlett','1996-09-24','M','4167394019',11,956),(12722142,'Chadwick','Owens','1994-12-04','M','4145088625',16,1025);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10868243,'Christian','Foster','1970-11-05','M','4243284216',17,907),(16182798,'Hasad','Franklin','1981-11-12','M','4162890228',4,1154),(15557152,'Kadeem','Hall','1962-12-20','M','4249488765',24,717),(10824472,'Sawyer','Pierce','1992-11-12','M','4248317325',21,1338),(10844704,'Zeph','Puckett','1964-04-17','M','4129640807',13,1477),(10713414,'Clarke','Hancock','1990-03-30','M','4167860450',11,550),(10839229,'Len','Hudson','1976-05-14','M','4243611398',8,510),(19982165,'Colin','Mercer','1975-06-08','M','4168416167',6,928),(15404295,'Thane','Beasley','1965-04-03','M','4249886160',2,603),(13821089,'Deacon','Shannon','1970-06-14','M','4244213120',14,1466);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10187118,'Brent','Phillips','1978-09-06','M','4241915107',23,769),(15100603,'Harper','Hunter','1987-02-28','M','4148667395',1,420),(21166491,'Emmanuel','Nunez','1960-10-22','M','4121588392',12,1173),(13792239,'Mark','Leach','1963-07-25','M','4248162692',18,934),(17895497,'Hoyt','Kirby','1972-06-15','M','4123260951',8,1362),(23897476,'Rashad','Valentine','1978-12-19','M','4126227696',12,484),(15428295,'Zachary','Wells','1992-07-15','M','4169876653',19,518),(22401954,'Axel','Gates','1988-06-01','M','4168486989',22,738),(13949275,'Neil','Kent','1981-08-19','M','4149465836',21,369),(18134391,'Owen','King','1969-10-08','M','4140669435',15,1003);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18054008,'Edan','Estes','1991-07-24','M','4147342105',13,1314),(18519991,'Brody','Charles','1993-01-10','M','4147333245',2,560),(23853518,'Bruno','Pickett','1979-01-25','M','4240370063',20,617),(10029073,'Shad','Jennings','1977-10-07','M','4120603174',25,1487),(22576437,'Lionel','Yang','1965-05-10','M','4120970880',3,1070),(18339893,'Wade','Sanders','1985-01-13','M','4148514562',7,984),(17608271,'Alec','Fernandez','1960-10-11','M','4143615676',11,822),(21725846,'Sylvester','Skinner','1985-11-25','M','4142782338',18,1127),(15551645,'Ignatius','Vang','1967-09-23','M','4169976909',11,1096),(18728287,'Jameson','Thompson','1985-06-23','M','4160329946',16,500);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24269509,'Jeremy','Rivera','1992-05-19','M','4162318828',20,939),(24669123,'Alan','Oneil','1961-06-21','M','4143208281',22,396),(24410332,'Troy','Monroe','1997-10-24','M','4148632804',21,1143),(24481747,'Brenden','Blevins','1977-05-22','M','4244320747',11,1413),(25758157,'Martin','Curtis','1982-02-14','M','4162373484',18,1275),(24050008,'Hop','Hansen','1975-12-02','M','4167445655',11,695),(22272981,'Merritt','Stark','1983-09-20','M','4169142506',23,632),(24239645,'Theodore','Blair','1969-12-07','M','4244684979',8,440),(22667421,'Evan','Tyson','1973-09-27','M','4162320709',14,408),(20765165,'Murphy','Mcconnell','1988-04-04','M','4163856489',12,820);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18723177,'Craig','Mejia','1967-04-25','M','4148667647',12,1483),(20025264,'Guy','Perez','1975-09-03','M','4240818500',20,619),(10304351,'Henry','Wise','1985-12-05','M','4248300544',16,1002),(16841463,'Barrett','Caldwell','1974-12-06','M','4123884452',2,815),(14273752,'Macaulay','Mcdowell','1974-11-24','M','4121693059',22,492),(15105937,'Paki','Wilkinson','1971-11-04','M','4123249141',1,1163),(13578691,'Keane','Booth','1980-12-29','M','4127457447',19,970),(16576971,'Cooper','Travis','1965-11-21','M','4141455566',18,361),(20023587,'Rajah','Bowers','1962-11-29','M','4147149781',3,809),(21522712,'Gavin','Meyers','1990-07-28','M','4124994988',21,791);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21963158,'Bevis','Lambert','1971-09-12','M','4161085961',24,1300),(18206312,'Joshua','Howe','1994-07-11','M','4240408650',4,1230),(17022548,'Erich','Davidson','1966-10-15','M','4244158871',1,1118),(20241849,'Murphy','Whitley','1970-01-23','M','4143163003',8,667),(25864427,'Raymond','Barr','1980-03-11','M','4240007300',23,1377),(16783764,'Vladimir','Fernandez','1996-08-08','M','4240637942',12,1297),(19999666,'Camden','Glass','1997-07-04','M','4162609291',11,1294),(11382964,'Denton','Sweeney','1972-01-27','M','4121540724',22,1184),(22264260,'Harding','Wilkinson','1984-03-25','M','4242407524',11,669),(18934085,'Coby','Zimmerman','1967-10-13','M','4165510173',19,1471);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25931343,'Trevor','Duke','1994-06-06','M','4142584483',14,793),(22877527,'Upton','Travis','1996-08-21','M','4165063285',8,1016),(21926112,'Mason','Mejia','1988-02-04','M','4160747016',1,444),(22828178,'Nash','Sparks','1976-12-18','M','4241335558',8,383),(12088692,'Gregory','Malone','1961-10-10','M','4160629466',1,1277),(10527109,'Bruce','Klein','1973-12-21','M','4142897700',2,507),(18563972,'Quinn','Fowler','1966-07-31','M','4247486479',21,743),(25723436,'Austin','Obrien','1991-06-23','M','4246393069',7,1470),(20256249,'Harrison','Frank','1990-07-31','M','4142343288',18,940),(25411462,'Keane','Horn','1977-04-29','M','4125359854',14,906);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18480121,'Quinn','Dunlap','1964-05-02','M','4248735252',20,733),(17686275,'Kadeem','Marquez','1992-05-03','M','4169533913',2,1034),(11411688,'Tyrone','Rodgers','1979-11-07','M','4240158844',25,1324),(12146498,'Nolan','Griffith','1988-07-05','M','4166853730',21,1234),(19594868,'Nathaniel','Morin','1985-07-15','M','4241313886',1,557),(24698872,'Mufutau','Welch','1961-03-15','M','4146128664',20,914),(21033463,'Demetrius','Russell','1977-09-02','M','4120154084',3,1492),(19780825,'Chaney','Walker','1969-01-28','M','4128736344',23,978),(25552839,'Lev','Pitts','1993-05-21','M','4126847924',2,585),(12380766,'Kibo','Armstrong','1991-01-01','M','4148196439',25,1294);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24683570,'Malik','Phillips','1998-02-22','M','4123143707',19,1073),(17627975,'Wayne','Orr','1979-04-20','M','4240464185',13,1073),(19980778,'Ian','Allison','1977-05-16','M','4129421462',4,865),(18338569,'Grady','Foreman','1991-02-10','M','4144963022',4,463),(24441834,'Brandon','Long','1960-12-16','M','4165321577',9,1261),(11228751,'Carlos','Parker','1961-07-16','M','4146866640',18,699),(12560045,'Oleg','Conner','1965-01-14','M','4160818715',1,1235),(14920074,'Kermit','Keith','1961-04-11','M','4249245819',15,398),(16631917,'Tucker','Hall','1967-02-08','M','4168909689',4,1090),(16812739,'Mason','Barr','1997-10-07','M','4122650668',13,1048);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14025247,'Colton','Barnett','1975-06-06','M','4162394043',21,1492),(11646817,'Harper','Levine','1978-10-17','M','4166146854',15,1113),(24128485,'George','Boyd','1981-06-03','M','4240657557',15,1037),(19432694,'Valentine','Holcomb','1994-11-26','M','4149051530',12,1315),(22258395,'Rudyard','Phelps','1989-01-24','M','4143433018',25,1352),(10064369,'Ira','Simmons','1960-06-18','M','4160808549',4,442),(23644839,'Phelan','Hudson','1994-05-31','M','4246332335',13,636),(20677657,'Elton','Shaw','1961-08-12','M','4240650631',1,987),(10740188,'Oleg','James','1965-11-27','M','4140175318',9,1307),(14684864,'Jamal','Russo','1995-09-12','M','4143450189',18,1245);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19243773,'Kamal','Burris','1978-06-12','M','4148935480',23,1431),(10442632,'Honorato','Todd','1984-03-31','M','4164136958',3,532),(10600990,'Cadman','Schmidt','1992-07-02','M','4243089446',20,1401),(20593047,'Basil','Patel','1992-05-04','M','4248356910',15,574),(21427488,'Upton','Ray','1976-08-17','M','4169101843',13,979),(23613256,'Tyrone','Tran','1965-03-10','M','4121900773',7,1438),(21306279,'Chandler','Hancock','1962-09-28','M','4147480294',10,1484),(18875620,'Simon','Kirby','1984-08-22','M','4127135415',10,459),(24505342,'Knox','Morales','1974-05-21','M','4120551408',2,1161),(11088526,'Troy','Thomas','1995-11-17','M','4145583717',22,689);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22056424,'Isaiah','Russell','1963-10-05','M','4141436879',13,1372),(25184334,'Keegan','Callahan','1992-06-06','M','4149997481',14,1056),(24356283,'Ezra','Park','1971-09-01','M','4245715136',7,1492),(21675793,'Quentin','Ruiz','1968-07-11','M','4242570847',17,650),(11881525,'Calvin','Lindsey','1960-08-18','M','4247387112',5,642),(20099345,'Buckminster','Freeman','1984-10-29','M','4127258805',14,897),(24959567,'Logan','Cash','1985-07-06','M','4167482480',7,1106),(25029054,'Aaron','Whitfield','1962-02-23','M','4240320580',19,1255),(23919561,'Phillip','Alvarado','1994-06-02','M','4123201614',23,404),(17738665,'Philip','Doyle','1996-09-05','M','4147394208',7,1404);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10335134,'Grady','Humphrey','1968-02-28','M','4148664176',8,883),(19183893,'Dylan','Huber','1966-06-11','M','4244296504',3,866),(19453044,'Oleg','Moore','1991-12-15','M','4169499880',20,959),(23632992,'Sean','Branch','1978-01-17','M','4241373654',4,1133),(25649919,'Laith','Francis','1971-08-07','M','4248960407',25,1332),(12951571,'Buckminster','Moon','1983-05-08','M','4149786877',23,1050),(17497837,'Wang','Sears','1991-06-19','M','4247940014',22,1099),(11695911,'Eaton','Sanchez','1976-01-12','M','4124588252',11,361),(15841558,'Kyle','Lowery','1988-01-02','M','4245825387',6,765),(10193480,'Aaron','Pickett','1985-04-24','M','4160771165',12,957);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16044915,'Camden','Hebert','1992-01-14','M','4166065274',15,1442),(21224490,'Lance','Rowland','1964-10-10','M','4147739801',3,392),(13501419,'Jelani','Washington','1973-03-02','M','4241501477',13,1221),(10443834,'Jeremy','Franks','1989-05-30','M','4165557575',2,983),(17042304,'Joel','Mcdaniel','1977-08-02','M','4124162604',14,1033),(25155627,'Lance','Walsh','1987-06-23','M','4161761626',23,766),(10085680,'Brady','Wooten','1977-05-20','M','4127906660',14,765),(23058370,'Tiger','Acevedo','1972-02-21','M','4163637436',18,392),(15792554,'William','Livingston','1984-12-04','M','4163335236',10,416),(11651063,'Lars','Chavez','1973-03-21','M','4166307993',12,403);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18628650,'Igor','Potter','1982-05-14','M','4241150409',10,513),(19789855,'Fitzgerald','Lucas','1996-11-12','M','4127161098',14,386),(14561324,'Lester','Nixon','1985-05-03','M','4240243424',15,805),(12633672,'Baker','Lucas','1979-08-16','M','4148230712',2,499),(16422974,'Talon','Gamble','1969-01-28','M','4124275901',11,1038),(12080471,'Mufutau','Ewing','1964-06-14','M','4144232983',1,1102),(20869153,'Callum','Schmidt','1990-01-14','M','4144342543',21,982),(25608237,'Colorado','Gonzalez','1962-05-07','M','4167700450',7,1074),(24118166,'Yasir','Cooper','1994-10-05','M','4169090031',21,512),(24929517,'Ray','French','1964-02-07','M','4168265816',6,1100);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11654293,'Tad','Koch','1979-01-13','M','4163783946',25,913),(23696486,'Brody','Hudson','1988-06-07','M','4246257864',25,724),(25091095,'Ian','Gonzales','1992-05-29','M','4169597645',18,1342),(24963502,'Barclay','Horn','1961-01-10','M','4127223313',11,883),(23802506,'Dorian','Benjamin','1980-03-31','M','4145254605',6,977),(10903632,'Lucian','Lewis','1965-08-20','M','4241015584',15,1324),(22685348,'Mason','Middleton','1977-12-17','M','4162603537',9,1103),(15793290,'Reuben','Gilmore','1970-05-18','M','4143103613',21,398),(18772953,'Aidan','Sherman','1963-11-13','M','4141226684',1,1337),(12538718,'Fitzgerald','Rivers','1966-11-08','M','4147785222',20,1195);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21335251,'Lance','Patterson','1962-10-13','M','4147672955',17,928),(14710753,'Marshall','Figueroa','1971-12-31','M','4120172645',1,725),(17772119,'Jerry','Knowles','1992-07-16','M','4148154323',3,764),(25735790,'Xavier','Morrison','1969-04-07','M','4148342468',20,1433),(10513222,'Robert','Strong','1995-01-16','M','4148150355',10,682),(18566376,'Alan','Herring','1960-08-26','M','4140875198',18,696),(10872179,'Tanner','Sweeney','1977-02-12','M','4161415159',4,492),(14479279,'Kuame','Vincent','1976-04-04','M','4244605140',19,1250),(25451275,'Chaney','Meadows','1965-10-31','M','4247478637',15,1194),(21675074,'Kyle','Walker','1984-05-12','M','4163392990',4,1487);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23441017,'Gabriel','Sandoval','1990-01-01','M','4167450129',15,1382),(20600217,'Ulysses','Blankenship','1978-10-09','M','4147946663',3,660),(17254426,'Dexter','Montgomery','1983-10-15','M','4129993081',3,1028),(15041231,'Orson','Talley','1965-01-24','M','4123969750',22,486),(10602138,'Dustin','Nash','1981-07-01','M','4160456577',16,1290),(15554450,'Jarrod','Pace','1975-12-16','M','4146101414',16,372),(14649701,'Leonard','Baxter','1989-02-08','M','4165636340',11,531),(11869633,'Graiden','Mcbride','1971-06-22','M','4245187392',17,381),(18083123,'Chancellor','Bentley','1988-02-18','M','4245939407',14,1111),(15045885,'Stephen','Maddox','1968-01-21','M','4160713433',6,1195);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11162533,'Levi','Hays','1994-12-23','M','4241095951',4,1034),(24695795,'Mark','Melton','1974-10-12','M','4149619841',22,1045),(10476009,'Preston','Medina','1997-07-18','M','4167133059',12,1468),(11700661,'James','Contreras','1964-03-27','M','4160378530',5,1172),(22715665,'Quinn','Carr','1994-04-01','M','4140797245',12,1073),(17068141,'Colby','Hoover','1997-08-07','M','4249422884',14,1163),(12098148,'Uriah','Deleon','1970-12-13','M','4246756292',15,431),(13068436,'Honorato','Goodman','1983-06-18','M','4129194949',20,605),(18722001,'Derek','Simmons','1966-06-10','M','4128837523',1,1387),(17544689,'Felix','Pena','1967-02-04','M','4129455391',20,958);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23822755,'Harlan','Matthews','1993-06-14','M','4127978937',8,1032),(10467539,'Walker','Mcbride','1971-04-11','M','4242009509',24,983),(21365597,'Joshua','Cantu','1981-05-10','M','4129591685',22,1377),(18875311,'Dillon','Finley','1993-01-09','M','4122258564',6,1099),(19595853,'Paul','Koch','1983-07-01','M','4124424932',19,528),(23064687,'Tucker','Whitehead','1986-12-18','M','4163920784',10,639),(19147750,'Kasimir','Rivas','1994-06-28','M','4161625046',23,719),(15323734,'Carter','Ramirez','1969-10-15','M','4140304086',7,631),(20673756,'Benedict','Rojas','1989-05-01','M','4249317213',16,910),(23161427,'Colton','Compton','1992-12-10','M','4124483392',20,880);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20721277,'Bevis','Meadows','1984-01-05','M','4145827775',12,1089),(25211129,'Oleg','Fleming','1974-03-10','M','4241273879',19,1466),(22880911,'Hammett','Houston','1973-08-11','M','4244050429',3,582),(11521550,'Jerry','Mclaughlin','1971-09-09','M','4162115214',21,587),(13978784,'Joel','Cook','1971-02-20','M','4124645669',5,524),(16666750,'Palmer','Henry','1995-10-02','M','4240107161',16,1009),(25119959,'Brody','Scott','1994-09-09','M','4249183300',3,821),(14683971,'Brock','May','1996-11-30','M','4164989494',1,919),(19109929,'Cole','Michael','1989-02-15','M','4121441322',7,1225),(11844753,'Oleg','Oconnor','1977-09-17','M','4240018459',25,663);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16885400,'Colby','Gillespie','1986-10-17','M','4161328873',12,1390),(21917260,'Brenden','Beard','1982-06-19','M','4143960746',6,1027),(10203054,'Cade','Tyson','1965-06-22','M','4245451527',3,1463),(22178117,'Octavius','Leonard','1964-01-30','M','4245807469',8,1037),(22568206,'Patrick','Murphy','1993-12-02','M','4160799201',19,1053),(25075931,'Barclay','Skinner','1971-05-15','M','4240247526',23,703),(12019566,'Devin','Conway','1989-12-13','M','4125587325',16,1440),(18892659,'Nash','Ware','1991-10-31','M','4249722631',10,1246),(14380529,'Donovan','Le','1996-12-25','M','4244846932',15,538),(14473484,'Leonard','Spears','1982-09-25','M','4121558817',24,744);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25870341,'Leroy','Munoz','1968-08-08','M','4127599332',9,1102),(20512870,'Noah','Camacho','1972-06-27','M','4243869305',20,893),(21946021,'Drake','Faulkner','1976-06-02','M','4162424704',8,1014),(18768889,'Jameson','Delgado','1975-12-30','M','4166719169',14,968),(19396216,'Byron','Summers','1972-07-03','M','4243643917',6,1024),(22188372,'George','Brewer','1991-07-25','M','4164771039',5,481),(20779807,'Kyle','Cline','1973-08-27','M','4244129888',13,620),(13945247,'Keefe','Paul','1981-01-12','M','4162237603',2,742),(16786662,'Chandler','Carey','1996-09-20','M','4242044581',11,666),(25107614,'Walker','Buchanan','1968-06-15','M','4249213228',25,1170);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15292856,'Ferdinand','Burch','1978-11-24','M','4144044687',12,758),(25185083,'Erasmus','Stewart','1966-06-21','M','4128220885',15,512),(18025306,'Buckminster','Whitfield','1990-06-29','M','4241295088',14,1072),(20504313,'Ulysses','Roberts','1972-11-12','M','4123120022',16,953),(17343951,'Avram','Johnson','1992-11-30','M','4143272848',25,619),(20314610,'Malcolm','Owens','1971-07-17','M','4148118347',10,593),(15441253,'Abdul','Madden','1978-04-24','M','4120625379',18,865),(11104306,'Emery','Nichols','1983-09-01','M','4245302805',16,723),(21924686,'Bernard','Mcguire','1993-09-08','M','4169471157',23,946),(19555545,'Cade','Wiley','1992-09-22','M','4166855794',8,979);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18419280,'Ciaran','Thornton','1984-05-23','M','4124208107',11,606),(25608160,'John','Crawford','1967-06-02','M','4249682477',9,1136),(18189383,'Mason','Mays','1989-01-27','M','4144407239',22,933),(15345095,'Ivan','Koch','1991-06-16','M','4166639871',3,1141),(25473989,'Grady','Zimmerman','1978-04-18','M','4122563819',3,1219),(15091891,'Mason','Roberson','1996-06-21','M','4126424055',22,794),(11358186,'Dylan','Todd','1969-11-25','M','4244079390',10,1049),(17218464,'Kevin','Dale','1970-09-14','M','4242361789',16,1281),(21240965,'Colby','Russell','1982-01-18','M','4247710254',23,1148),(23537799,'Alfonso','Shepard','1965-02-15','M','4248934833',11,894);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16928652,'Denton','Day','1979-03-24','M','4247622640',15,871),(19468005,'Geoffrey','Ford','1971-05-19','M','4141923158',15,400),(17058881,'Acton','Roth','1970-01-13','M','4141748031',15,1163),(18741843,'Erasmus','Colon','1995-04-10','M','4160702832',15,1063),(21966807,'Levi','Dyer','1984-06-14','M','4128238991',22,559),(14900393,'Cullen','Andrews','1969-06-05','M','4166737488',2,634),(10920757,'Thomas','Golden','1981-04-17','M','4148768452',16,1425),(12997388,'Ross','Avila','1996-12-04','M','4168018045',25,1418),(22397298,'Slade','Adkins','1970-12-11','M','4120920407',2,943),(10729412,'Thor','Mooney','1987-05-17','M','4143280438',15,1065);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17735368,'Jarrod','Peck','1961-05-13','M','4120583777',18,1371),(20871676,'Levi','Rollins','1976-08-03','M','4249680867',20,965),(18240913,'Austin','Slater','1988-04-16','M','4126580768',22,1442),(12776189,'Jermaine','Nicholson','1997-02-11','M','4163594112',16,1447),(21544297,'Curran','Hurst','1993-04-26','M','4149914968',19,1098),(16950704,'Grant','Hoover','1960-08-25','M','4128552311',24,427),(16550567,'Brett','Turner','1989-02-10','M','4129104154',23,977),(11189180,'Omar','Osborn','1996-01-21','M','4166102856',19,669),(24138825,'Carlos','Richardson','1966-09-05','M','4149782022',4,1059),(10471254,'Alfonso','Vaughn','1974-02-15','M','4127857842',22,1129);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (16644806,'Dolan','Nielsen','1985-05-15','M','4127310834',22,1373),(12320139,'Griffin','Meyers','1987-09-25','M','4243239407',9,1111),(17173487,'Drew','Schneider','1970-10-18','M','4124538484',23,936),(11672536,'Carson','Webb','1961-02-10','M','4249032326',4,1264),(12807479,'Dolan','Brown','1988-05-24','M','4145567801',20,881),(23993129,'Hyatt','Gordon','1970-07-29','M','4163828282',3,1055),(22806912,'Silas','Winters','1975-01-06','M','4166373557',3,713),(25208412,'Elvis','Austin','1976-05-21','M','4145623984',22,1178),(18282985,'Nigel','Mullins','1984-09-01','M','4149038134',11,1040),(23322640,'Malik','Shepard','1985-08-13','M','4248582028',2,1495);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19535817,'Rogan','Head','1986-06-07','M','4146988323',25,1282),(19052576,'Carl','Hurley','1993-11-10','M','4240446632',25,882),(13457031,'Simon','Lucas','1980-11-01','M','4140851633',5,774),(18139471,'Kelly','Mooney','1989-08-18','M','4244734942',23,1321),(10934914,'Salvador','Guzman','1966-05-14','M','4144404009',6,1332),(16346071,'Joel','Mcgee','1963-09-26','M','4122202613',3,1159),(21544837,'Ulric','Wall','1972-04-30','M','4120852145',17,1255),(13696137,'Jelani','Holt','1979-04-01','M','4120572257',17,769),(11288347,'Quinn','Alston','1971-11-25','M','4168861859',6,455),(25753049,'Akeem','Hill','1994-04-09','M','4140653992',21,630);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17538391,'Shad','Ayers','1997-11-13','M','4123612305',1,1055),(17041675,'Quamar','Rivas','1981-09-13','M','4167351999',12,1271),(25227363,'Garrett','Wyatt','1992-02-14','M','4167818887',21,1201),(12840001,'Xavier','Schneider','1981-08-26','M','4245666232',4,943),(16391221,'Adrian','Hunter','1997-01-14','M','4167889190',3,431),(24963818,'Yoshio','Boyer','1975-06-19','M','4124905334',16,1369),(14367484,'Macon','Fuentes','1998-03-08','M','4143267748',17,1177),(25071570,'Magee','Burton','1984-09-02','M','4121061178',9,1068),(23605189,'Walker','Hoffman','1984-08-28','M','4164410370',21,1451),(10897624,'Todd','Vasquez','1978-06-18','M','4143214055',23,938);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10182813,'Owen','Clemons','1990-07-24','M','4169983360',15,1204),(15505412,'Walker','Cross','1989-02-21','M','4124876180',6,920),(13833972,'Hop','Bowen','1981-06-20','M','4241362420',18,1125),(14207780,'Rashad','Espinoza','1968-10-28','M','4164008791',14,614),(20661788,'Daquan','Bailey','1975-01-01','M','4244677707',20,876),(16634860,'Alfonso','Weeks','1991-11-14','M','4161957105',5,1271),(12034074,'Ivan','Figueroa','1963-03-24','M','4129737195',25,961),(11591406,'Amos','Hampton','1996-07-23','M','4125781476',10,622),(23764896,'Zeus','Mcmillan','1982-09-14','M','4160203843',10,1210),(16552705,'Julian','Wright','1998-04-08','M','4161927231',10,668);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17679919,'Oliver','Cain','1975-01-30','M','4122101283',4,398),(13014670,'Dominic','Levy','1987-08-17','M','4122381205',23,512),(14423763,'Cedric','Cooley','1971-08-27','M','4248533409',7,1259),(20899333,'Magee','Fernandez','1987-11-21','M','4246450280',20,640),(10456455,'Jerome','Ramirez','1965-08-04','M','4147333436',15,1226),(25719910,'Grant','Dalton','1976-12-22','M','4140327321',5,1149),(12102263,'Burke','Alexander','1972-07-18','M','4127000145',13,360),(11881681,'Baxter','Bright','1993-03-15','M','4126581700',24,525),(13885713,'Chaim','Lewis','1985-04-14','M','4121910230',19,1065),(20964547,'Wing','Battle','1975-11-02','M','4245384368',15,538);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25958118,'Dexter','Avila','1982-05-28','M','4123979914',13,789),(19210820,'Ferdinand','Chavez','1976-06-08','M','4123311280',11,419),(14165151,'Linus','Snow','1990-01-02','M','4166292210',24,1220),(15862715,'Macaulay','Lynn','1988-07-05','M','4120928449',20,1421),(15825462,'Brody','Mosley','1966-12-21','M','4160224601',2,1356),(22157155,'Flynn','Baxter','1994-11-18','M','4140881212',11,490),(12469657,'Nicholas','Lambert','1984-09-19','M','4169258020',2,555),(17802608,'Kuame','Swanson','1984-10-01','M','4123468710',9,865),(16811234,'Wang','Quinn','1976-10-09','M','4245854859',23,556),(25848608,'Bernard','Mccall','1977-09-23','M','4240107860',19,838);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15971758,'Lamar','Joseph','1962-09-21','M','4129972769',14,1436),(24580575,'Baxter','Sloan','1980-01-17','M','4144817435',7,1460),(21216764,'Magee','Giles','1997-01-30','M','4148399167',7,1340),(18977020,'Keith','Mcguire','1975-09-06','M','4166966154',6,663),(21280652,'Wang','Osborne','1969-06-15','M','4140325296',7,1058),(13521188,'Ezra','Byers','1984-03-19','M','4246001636',21,1375),(14167507,'Omar','Horton','1962-06-18','M','4160520012',9,859),(15179945,'Knox','Kent','1964-08-24','M','4247559234',20,1287),(16400344,'Chase','Finley','1987-12-16','M','4242337992',23,472),(23621313,'Bradley','Thompson','1996-11-30','M','4240291235',8,1370);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24715633,'Ira','Owen','1978-03-26','M','4148677378',15,1278),(25172922,'Cruz','Hatfield','1960-06-22','M','4166763846',6,1318),(22370369,'Calvin','Marquez','1982-07-09','M','4120371033',25,1203),(21667275,'Quamar','Manning','1985-04-25','M','4246579066',10,1175),(10663491,'Perry','David','1962-04-24','M','4249273400',17,1132),(24097338,'Carter','Hunter','1974-07-04','M','4248766309',19,416),(13357460,'Leroy','Chandler','1970-05-28','M','4240393787',14,1410),(21414191,'Quinlan','Johns','1974-07-12','M','4128981348',3,899),(20185238,'Lester','Kerr','1981-07-26','M','4165243727',1,1493),(14175694,'George','Ramsey','1996-08-03','M','4242137503',4,1337);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17951816,'Timon','Cannon','1975-08-27','M','4145463007',20,1324),(22589481,'Isaiah','Boone','1982-04-23','M','4147237316',15,1222),(18869096,'Paki','Whitfield','1977-11-22','M','4146212544',9,607),(23720594,'Kenneth','Maxwell','1972-05-09','M','4249622814',9,503),(21336287,'Lawrence','Glover','1980-09-11','M','4248846280',21,1140),(18455272,'Roth','Wood','1963-11-07','M','4120714406',22,787),(18223576,'Austin','Mercer','1976-05-22','M','4166232047',4,1350),(12474058,'Drew','Boyer','1975-04-24','M','4160274066',12,1149),(14254809,'Beau','Alford','1961-03-08','M','4146449124',7,550),(15971938,'Linus','Mccarthy','1964-05-14','M','4244190567',16,880);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12901411,'Wesley','Hebert','1961-12-04','M','4126438134',4,1466),(19137880,'Tobias','Rosa','1976-07-10','M','4243483470',24,1363),(15724967,'Rogan','Crosby','1974-03-28','M','4120712139',17,987),(23867923,'Isaiah','Sharpe','1997-02-15','M','4165322012',1,981),(13382871,'Aquila','Russell','1980-07-07','M','4249543780',8,1277),(14657196,'Bruce','Harrison','1983-11-16','M','4120158970',6,425),(16800410,'James','Wallace','1967-06-12','M','4247483231',6,1410),(17398786,'Kasimir','Petersen','1973-02-05','M','4246071729',10,1470),(24619004,'Forrest','Small','1980-02-21','M','4120579967',21,910),(25064200,'Dale','Nguyen','1972-08-20','M','4120022054',10,1097);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15380959,'Zachary','Mayo','1983-07-23','M','4247761884',22,1300),(18217409,'Nathan','Mejia','1964-02-05','M','4161874268',24,378),(23562591,'Silas','Webster','1977-03-20','M','4163283589',4,682),(23669851,'Jonas','Wyatt','1971-10-06','M','4167236389',19,1200),(13842011,'Igor','Ryan','1982-11-03','M','4128051237',1,670),(23508669,'Callum','Sloan','1976-03-22','M','4127163066',2,741),(10267462,'Tanner','Curry','1991-04-02','M','4244423826',15,484),(19619793,'Kermit','Cochran','1981-03-12','M','4249895045',25,1423),(21173821,'Judah','Oliver','1979-06-09','M','4166600858',19,1359),(18520309,'Graham','Blevins','1980-05-21','M','4124740268',7,1088);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21007711,'Ahmed','Hernandez','1966-11-16','M','4143660175',16,1424),(10747416,'Amos','Blackburn','1970-12-29','M','4247132087',13,1064),(21132753,'Cullen','Byers','1998-01-22','M','4141789610',6,1306),(25352202,'Edward','Gilbert','1966-10-27','M','4247461479',20,1320),(23855746,'Blaze','Murray','1964-10-19','M','4129801463',15,829),(22209151,'Odysseus','Weaver','1984-12-05','M','4240072792',14,1250),(19559307,'Carson','Petty','1994-01-18','M','4247779840',23,673),(25278492,'Ian','Clements','1978-03-22','M','4146911334',17,562),(14749233,'Cooper','Johnston','1976-04-02','M','4165161470',4,364),(15287623,'Benjamin','Rodriguez','1972-10-08','M','4120498814',7,1058);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18479432,'Linus','Gardner','1973-05-28','M','4144647140',21,754),(24367419,'Jamal','Collier','1990-06-12','M','4244903146',14,1382),(20365486,'Gary','Chaney','1970-01-04','M','4164429239',10,1193),(25040455,'Merritt','Bond','1971-04-25','M','4166220356',8,467),(11448405,'Eaton','Callahan','1986-08-25','M','4244967190',1,434),(20186824,'Todd','Carver','1994-08-15','M','4148361742',16,703),(13510212,'Merrill','Sandoval','1980-01-11','M','4126929453',25,921),(15254965,'Dale','Workman','1971-05-27','M','4243660225',8,604),(19200334,'Phillip','Bowen','1993-07-07','M','4129602253',18,1483),(12505760,'Brendan','Oconnor','1980-10-11','M','4241512442',2,838);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25345463,'Channing','Wallace','1976-04-19','M','4163400145',18,793),(18797590,'Garrett','Fletcher','1974-12-09','M','4125741571',10,455),(20443406,'Allistair','Lambert','1982-10-04','M','4125629332',11,1078),(21429121,'Alvin','Roman','1996-11-06','M','4240715239',17,842),(10133235,'Cruz','Downs','1994-07-25','M','4149755764',15,723),(19787981,'Hop','Mcmillan','1991-08-16','M','4148653084',14,1272),(18528809,'Hyatt','Grimes','1987-08-31','M','4144904773',14,1401),(14259839,'Kenyon','Matthews','1987-08-08','M','4167197951',24,1297),(21955213,'Solomon','Douglas','1975-12-21','M','4164967488',18,787),(16125524,'Raymond','Kerr','1984-07-13','M','4241831374',4,843);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21068369,'Brady','Duran','1969-09-18','M','4129419367',17,616),(13432046,'Octavius','Leon','1982-02-28','M','4242911082',14,559),(23321993,'Timothy','Miranda','1991-08-22','M','4247431779',4,1163),(10454856,'Kadeem','Mcintyre','1996-12-20','M','4122054009',8,733),(23964653,'Jin','Tran','1986-04-29','M','4249296492',8,678),(11848812,'Allen','Bryant','1973-07-25','M','4162843531',19,441),(21979137,'Jackson','Snider','1964-09-03','M','4168911650',4,1198),(18020438,'Beau','Lang','1978-03-15','M','4129060720',10,673),(13002044,'Rahim','Hodge','1990-06-19','M','4146437675',25,1073),(25528112,'Ferris','Hewitt','1988-08-06','M','4162715467',18,869);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24924530,'Rajah','Smith','1985-12-09','M','4126039968',8,1106),(22635597,'Aristotle','Goodwin','1964-09-22','M','4123120020',1,1148),(16940598,'Lance','Duncan','1982-06-19','M','4142586621',6,1458),(16046047,'Todd','Mitchell','1972-02-19','M','4241040820',23,1412),(17053856,'Kenneth','Hahn','1980-03-08','M','4164233049',4,1444),(13764763,'Hu','Hodge','1972-02-08','M','4246377647',3,888),(22374137,'Macaulay','Clark','1993-06-19','M','4169197113',11,958),(15916776,'Ahmed','Garrison','1967-01-29','M','4166313432',5,571),(25927951,'Keith','Ford','1977-05-10','M','4242242891',25,727),(10743284,'Bradley','Leach','1968-01-03','M','4128428031',9,1141);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10477506,'Salvador','Baldwin','1970-02-20','M','4140782536',17,625),(15211740,'Nasim','Combs','1997-01-11','M','4240528451',17,1326),(21159311,'Merrill','Rowland','1975-04-26','M','4249578454',3,1377),(10358626,'Lars','Wiley','1985-05-09','M','4249921879',17,841),(21413434,'Alan','Collier','1980-10-02','M','4242455987',12,862),(24269707,'Axel','Mcknight','1964-06-04','M','4161513144',21,1462),(13611955,'Noah','Tyler','1985-08-05','M','4240233767',22,736),(23725768,'Thane','Higgins','1991-01-03','M','4249667812',23,1196),(16114190,'Philip','Maxwell','1982-08-03','M','4243159005',2,762),(12120300,'Mason','Branch','1993-11-04','M','4145385236',19,1075);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21196625,'Reese','Bright','1977-01-30','M','4167182875',3,509),(14332211,'Leroy','Beasley','1979-11-22','M','4240738230',8,877),(10337081,'Kasper','Spence','1985-05-01','M','4127534117',7,1447),(10172685,'Stephen','Rodriquez','1988-09-07','M','4145958820',17,1441),(17780342,'Brennan','Page','1964-08-15','M','4141442146',13,1270),(22138952,'Maxwell','Acosta','1983-05-21','M','4143920008',10,1173),(10851103,'Wade','Richmond','1971-10-22','M','4125478094',14,606),(17823451,'Joshua','Tyler','1996-09-06','M','4167826417',5,1068),(12038866,'Marshall','Foley','1986-03-21','M','4140649623',5,686),(14858792,'Dolan','Hunt','1979-01-29','M','4169049472',19,1154);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25931756,'Meghan','Marshall','1961-01-18','F','4245544905',20,818),(13733607,'Fatima','Patterson','1961-04-22','F','4146999826',22,1303),(22074560,'Illiana','Hart','1966-05-07','F','4120296411',21,1262),(13121005,'Xyla','Sawyer','1970-05-08','F','4144703665',12,439),(21361628,'Kaitlin','Baird','1986-01-13','F','4245871767',1,929),(24879351,'Abigail','Craig','1962-05-18','F','4149031772',23,537),(19275459,'Erin','Dean','1973-04-11','F','4165995858',5,1160),(24377314,'Tatiana','Valentine','1993-05-24','F','4163622064',12,666),(24552918,'Althea','Perez','1987-10-08','F','4245924277',14,1329),(18781665,'Gloria','Huber','1974-11-02','F','4127962166',24,732);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10975831,'Chastity','Mercado','1964-01-01','F','4166563383',7,1120),(18257071,'Serena','Avery','1960-09-01','F','4244597379',20,513),(22727864,'Yoshi','Howell','1974-11-01','F','4149979782',7,831),(20732568,'Darryl','Bush','1961-04-27','F','4162500621',13,946),(23728808,'Quyn','Dennis','1960-06-24','F','4122170099',1,1317),(25160862,'Indigo','Finch','1986-03-03','F','4141059964',22,631),(22270430,'Naida','Garza','1973-01-16','F','4244982136',21,804),(15320041,'Olga','Woods','1984-03-25','F','4121291420',10,1027),(19491485,'Brooke','Sandoval','1989-09-03','F','4244376462',23,687),(12642113,'Imelda','Mccray','1963-06-22','F','4144643401',14,1120);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17119456,'Aphrodite','Fox','1981-07-02','F','4143292869',7,799),(10683979,'Octavia','Perkins','1996-10-05','F','4167428764',18,1063),(21731938,'Piper','Hunter','1986-08-28','F','4124730165',20,1412),(25728081,'Cherokee','Blake','1992-06-20','F','4143991129',18,1439),(11413351,'Quin','Wilder','1983-11-30','F','4142843291',1,1436),(15597560,'Leila','Spencer','1967-04-24','F','4143409856',20,515),(15763712,'Chantale','Lane','1968-05-14','F','4144997387',15,1447),(21394362,'Tana','Huff','1997-04-12','F','4248921180',15,826),(20997291,'Jaquelyn','Flynn','1964-10-21','F','4160483669',4,1285),(13732813,'Shay','Herring','1986-04-11','F','4144828269',21,574);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15896882,'Patricia','Berger','1991-12-13','F','4164488080',1,1140),(16553176,'Patricia','Higgins','1992-02-13','F','4129975250',3,835),(22492075,'Marcia','Bates','1980-06-09','F','4240457138',9,1064),(21056796,'Jessica','Webb','1982-08-23','F','4140908857',5,669),(21808578,'Ursa','Morin','1994-09-22','F','4163247397',2,700),(16983399,'Nelle','Ballard','1993-05-06','F','4244674754',5,1354),(21545981,'Wanda','Roman','1986-02-13','F','4244120803',3,464),(12848824,'Risa','Carver','1983-10-16','F','4243341129',5,1302),(14016538,'Tamekah','Hamilton','1994-04-01','F','4145316240',18,1136),(21548730,'Tatyana','Carney','1975-12-10','F','4121651158',4,1226);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17491645,'Shannon','Castro','1984-12-07','F','4142984805',9,964),(13625710,'Camille','Conway','1970-03-19','F','4241958686',1,1260),(13472285,'Lael','Mann','1978-05-20','F','4140400512',12,1462),(16052581,'Zoe','Rhodes','1970-06-13','F','4140013841',14,583),(25987907,'Bertha','Palmer','1979-11-08','F','4120955911',20,651),(13523226,'Selma','Hoffman','1960-08-08','F','4245064992',25,561),(21812332,'Dominique','Larsen','1993-11-13','F','4169694125',23,1485),(24450625,'Gloria','Montgomery','1973-10-24','F','4121582922',10,1413),(20769962,'Idona','Steele','1960-07-13','F','4144563400',4,698),(13222217,'Scarlett','Warren','1994-03-16','F','4120373739',16,1144);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17505746,'Pascale','Hoover','1971-11-28','F','4148540306',3,1309),(14332414,'Darrel','Cole','1964-08-01','F','4147127765',14,1116),(21053881,'Jenna','Ross','1994-10-18','F','4242370541',8,426),(25263327,'Hilda','Tyler','1995-04-30','F','4243581356',1,758),(23662726,'Fallon','Lara','1984-03-13','F','4128680325',7,1093),(14494526,'Zephr','Mccormick','1972-09-05','F','4129131492',1,460),(11656141,'Aubrey','Bright','1975-05-19','F','4127467560',22,783),(18039156,'Cally','Mayo','1976-03-26','F','4161756352',25,1384),(16209162,'Frances','Hatfield','1984-04-25','F','4147014926',17,1311),(19636847,'Jael','Herman','1985-04-29','F','4244565997',21,618);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22128294,'Yetta','May','1966-06-24','F','4245500497',10,911),(15623042,'Ayanna','Hahn','1974-04-20','F','4144411246',6,471),(12657260,'Samantha','Finch','1967-06-01','F','4142889153',21,1139),(21965318,'Evelyn','Dickson','1992-03-11','F','4244904247',22,832),(23886989,'Odette','Rhodes','1982-03-02','F','4127483155',5,1453),(13402287,'Darryl','Shepherd','1961-06-25','F','4129479413',6,755),(24217433,'Roanna','Rodgers','1978-07-05','F','4169215210',11,414),(11854237,'Brenna','Lopez','1968-06-07','F','4243288328',3,1281),(17480284,'Fleur','Buck','1987-04-06','F','4244673333',7,383),(16468033,'Karly','Knowles','1997-11-19','F','4247112203',18,514);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (21232150,'Octavia','Sykes','1982-04-15','F','4167081085',15,1024),(10813633,'Cleo','Holden','1971-08-16','F','4145340688',18,452),(14229041,'Sage','Randolph','1974-10-11','F','4243386349',5,1237),(21920476,'Deirdre','Cox','1988-05-09','F','4149253406',8,549),(10159477,'Tamekah','Kelly','1974-04-04','F','4149909400',1,1414),(25448314,'Christen','Yang','1998-01-04','F','4149756666',10,1060),(15093998,'Lacota','Anderson','1982-02-16','F','4129715519',14,971),(16746340,'Faith','Lancaster','1969-06-20','F','4128370863',25,550),(23936725,'Barbara','Mccall','1983-08-26','F','4120037230',16,915),(22038049,'Jolene','Huffman','1990-07-04','F','4149175716',12,1242);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13913853,'Shea','Maynard','1989-10-13','F','4148108919',21,841),(18500183,'Hedda','Hurst','1968-02-09','F','4125547409',14,785),(20755308,'Clio','Bartlett','1997-06-03','F','4248333087',15,1489),(13124144,'Madonna','Bullock','1963-05-16','F','4140801998',15,794),(25797416,'Lacy','Boyle','1978-12-12','F','4169718655',15,1359),(19048155,'Idola','Butler','1996-11-22','F','4166178000',22,896),(25953009,'Hyacinth','Edwards','1980-10-19','F','4143973231',14,944),(14424984,'Judith','Ortega','1968-10-29','F','4124162498',11,1461),(20545158,'Noelani','Fitzgerald','1998-05-11','F','4161121122',6,519),(24425248,'Rhona','Morton','1994-01-03','F','4241897409',17,1257);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20417516,'Zorita','Taylor','1997-11-18','F','4122436847',24,701),(25358466,'Angela','Shannon','1964-06-20','F','4122967084',15,803),(25430746,'Rae','Calderon','1985-04-19','F','4162061945',8,593),(23216201,'Alexa','Roman','1991-04-20','F','4160293922',18,1255),(22792952,'Signe','Pace','1993-03-27','F','4120330747',12,1491),(16863681,'Whitney','Preston','1961-04-21','F','4167364085',25,541),(23810208,'Shoshana','Prince','1968-08-08','F','4243921581',1,1424),(18231592,'Serina','Chase','1977-06-28','F','4143602049',11,824),(15672717,'Phyllis','Copeland','1961-12-21','F','4127647849',14,1104),(21083523,'Oprah','Parsons','1960-11-09','F','4247379997',6,801);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17929355,'Lila','Sellers','1993-04-20','F','4143795844',15,464),(17535759,'Nicole','Keith','1973-01-09','F','4164761705',11,1341),(16900151,'Zoe','Schwartz','1975-10-15','F','4143235511',7,614),(20846027,'Lydia','Allison','1995-10-27','F','4141352753',12,964),(22479421,'Maris','Bowers','1993-04-10','F','4146835886',4,642),(20649448,'Chloe','Mcguire','1983-12-23','F','4121689737',21,592),(23610575,'Hadley','Lott','1994-07-16','F','4246821240',19,1120),(12051987,'Zena','Fitzpatrick','1975-07-26','F','4145144162',4,1092),(14972273,'Brittany','Colon','1987-09-23','F','4143347752',22,1317),(21133957,'Giselle','Howe','1983-05-11','F','4148523540',25,684);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24285424,'Darrel','Leach','1986-04-12','F','4167244178',8,526),(10263592,'Violet','Russell','1971-07-24','F','4141582946',9,857),(21800042,'Stella','Sandoval','1969-01-15','F','4168857029',7,872),(18618305,'Elaine','Hatfield','1996-05-19','F','4168358273',6,597),(21185827,'Jamalia','Best','1974-06-11','F','4242810151',16,399),(17589141,'Gillian','Grant','1963-07-05','F','4141219597',20,429),(25426774,'Anika','Wade','1974-04-07','F','4160617466',8,1221),(10857697,'Sydney','Hester','1969-06-18','F','4149914722',6,1237),(13985038,'Cheyenne','Livingston','1980-04-09','F','4249848529',17,1287),(11557889,'Cherokee','Knox','1983-02-14','F','4141079302',17,1247);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23781011,'Jasmine','Ware','1980-09-10','F','4169080962',22,1225),(16413917,'Sybill','Dorsey','1975-01-24','F','4140664225',14,1296),(11062550,'Kelly','Wilkins','1983-11-16','F','4249427352',20,1404),(21752065,'Medge','Mcfarland','1992-05-13','F','4145717036',10,459),(20516552,'McKenzie','Alford','1987-12-06','F','4242076650',23,1042),(25777195,'Rhoda','Shaffer','1991-12-14','F','4160024179',17,1306),(22129753,'Beatrice','Larsen','1991-08-25','F','4143122041',11,703),(13560160,'Aurora','Wilkinson','1996-02-07','F','4127305441',7,673),(14098397,'Clementine','Cantu','1961-08-24','F','4246061429',24,1237),(13161900,'Martha','Park','1984-01-06','F','4241523767',4,1182);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20680628,'Sophia','Parker','1997-08-05','F','4128847998',24,399),(18496345,'Althea','Cameron','1968-09-12','F','4126494581',9,783),(14311494,'Mariko','Gutierrez','1991-05-03','F','4241568562',16,473),(22577641,'Renee','Rocha','1970-10-06','F','4166032082',10,430),(16245578,'Unity','Reid','1992-01-11','F','4249488082',19,1120),(24072125,'Catherine','Bowen','1988-07-26','F','4121934595',9,1447),(16245582,'Adele','Mcneil','1989-05-11','F','4246973982',4,880),(23599041,'Jenna','Figueroa','1973-01-25','F','4126290673',6,1056),(11711231,'Felicia','Weeks','1992-09-01','F','4249903649',22,471),(12760527,'Maryam','Mathis','1987-10-11','F','4142861889',10,988);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (24725793,'Vielka','Lynn','1966-06-18','F','4247514279',22,360),(20666123,'Scarlett','Cline','1986-06-11','F','4241052255',18,1002),(14638901,'Courtney','Fry','1962-06-11','F','4246744217',20,512),(12504743,'Amaya','Sweet','1988-08-30','F','4246482706',11,942),(12257627,'Phoebe','Owens','1988-04-09','F','4165224230',10,1128),(17802970,'Amanda','Larson','1974-08-22','F','4241700869',9,900),(23979071,'Gail','Oneill','1985-07-05','F','4166039204',4,1337),(25666967,'Dara','Ayers','1986-04-16','F','4124352852',15,854),(23715066,'Simone','Cantu','1981-06-12','F','4128872110',22,761),(20086323,'TaShya','Ballard','1996-03-11','F','4146600781',24,978);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22374894,'Wanda','Farmer','1967-02-04','F','4248560489',23,1078),(10673259,'Ava','Cox','1991-03-26','F','4164311909',4,745),(14832523,'Xaviera','Fuller','1964-01-23','F','4147833998',2,427),(20316244,'Xandra','Gibson','1972-06-16','F','4122888384',8,1304),(24622664,'Debra','Robles','1980-11-14','F','4149580366',21,1275),(25100703,'Teegan','Avila','1982-11-30','F','4242948554',10,479),(11801724,'Joelle','Stephens','1997-11-27','F','4146384247',14,1336),(25314664,'Doris','Berg','1976-05-19','F','4247496697',21,524),(25159024,'Yvonne','Flores','1964-07-28','F','4249791469',10,855),(14997456,'Priscilla','Burgess','1971-03-25','F','4163457407',6,1019);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13622120,'Alana','Shaffer','1976-10-25','F','4247010209',9,1283),(13769475,'Meghan','David','1965-09-28','F','4145032588',17,472),(21738966,'Kitra','Joseph','1981-07-06','F','4129315527',5,823),(18771915,'Stacy','Bonner','1981-09-29','F','4160605962',18,598),(23156817,'Signe','Lara','1992-11-21','F','4129492351',3,361),(21123389,'April','Ingram','1995-04-06','F','4144479225',22,760),(14566936,'Susan','Raymond','1964-09-28','F','4120871876',16,715),(18708622,'Hope','Guzman','1978-05-31','F','4243070692',6,1351),(19450754,'Kellie','Marsh','1976-03-07','F','4126156449',18,990),(13444739,'Jorden','Blankenship','1975-10-04','F','4168148892',19,946);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25282864,'Zorita','Kelly','1972-01-12','F','4165413626',8,416),(21154750,'Evelyn','Malone','1990-05-22','F','4160433830',4,458),(19088072,'Cassidy','Schmidt','1981-08-11','F','4127215034',21,1452),(19543263,'Rana','Todd','1979-09-28','F','4141000805',2,1485),(15932050,'Fiona','Bowman','1990-10-19','F','4169968814',16,1014),(25176236,'Karina','Wolf','1978-08-14','F','4162369032',15,1167),(12096003,'Sheila','Walton','1992-08-06','F','4122903201',18,1410),(14263186,'Lois','Craft','1963-01-12','F','4165679546',20,487),(17722655,'Sage','Knight','1984-02-25','F','4244838734',5,772),(15483175,'Karina','Mclaughlin','1979-08-20','F','4128620033',19,486);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12888970,'Octavia','Whitfield','1971-07-17','F','4147879201',19,993),(19445996,'Orla','Randolph','1980-09-25','F','4240284523',2,684),(22948239,'Cassady','Foreman','1985-11-05','F','4121186271',9,460),(23451696,'Jada','Hardin','1983-08-27','F','4245551444',5,849),(11219564,'Lee','Perkins','1976-08-15','F','4164377163',4,1449),(19772842,'Shelby','Campos','1986-10-25','F','4147769142',21,1225),(17348669,'Shelly','Newman','1972-05-25','F','4142224111',25,688),(23078425,'Xandra','Landry','1980-07-13','F','4142158741',22,1335),(16193415,'Debra','Lucas','1984-05-07','F','4144981620',15,1299),(18113343,'Briar','Madden','1990-10-05','F','4127253608',16,1409);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13331237,'Piper','Sherman','1996-10-31','F','4127082270',3,917),(17397900,'Deborah','Farley','1966-11-04','F','4140188376',5,852),(15350244,'Mikayla','Goff','1983-01-06','F','4242569569',2,1330),(17341818,'Brynne','Gaines','1980-05-20','F','4163525065',6,1253),(13512093,'Veronica','Justice','1987-06-08','F','4161190499',21,1206),(14429103,'Irma','Tanner','1986-12-26','F','4163350687',22,1090),(20157366,'Bell','Kline','1974-11-23','F','4126204438',13,688),(19674699,'Lavinia','Gray','1984-02-27','F','4247595674',7,389),(12737694,'Kimberley','Nieves','1991-11-21','F','4124983293',24,627),(22314242,'Pamela','Nash','1971-10-10','F','4164577892',20,1481);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (12800791,'Ria','Sheppard','1973-02-15','F','4147911730',10,942),(22453043,'Ima','Hahn','1990-12-30','F','4167719313',22,1470),(11965726,'Imelda','Colon','1979-11-06','F','4241504590',23,795),(13639361,'Moana','Hodges','1986-05-10','F','4144435012',18,756),(19329750,'Guinevere','Witt','1975-09-19','F','4120412026',4,1481),(22041030,'Mikayla','Wiley','1961-11-27','F','4126230310',22,713),(21345764,'Ruth','Boone','1989-11-04','F','4149300424',1,543),(15684338,'Ann','Fry','1980-04-14','F','4243105610',20,1184),(23982048,'Whilemina','Giles','1971-10-07','F','4168467063',15,1044),(12375345,'Isabelle','Rosales','1966-11-18','F','4143467982',3,1391);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11283700,'Laurel','Rios','1964-01-13','F','4162928117',4,1022),(23269879,'Cecilia','Shelton','1974-12-20','F','4127324333',2,480),(15773996,'Morgan','Cervantes','1976-12-03','F','4240754035',17,713),(10378849,'Camilla','Hicks','1980-06-29','F','4125603336',3,649),(14793803,'Jillian','Rosa','1986-09-26','F','4126020833',14,1074),(15823659,'Britanney','Mann','1992-04-17','F','4142689206',21,1020),(23796144,'Maris','Cabrera','1985-07-26','F','4243155527',25,979),(17922960,'Jocelyn','Fuller','1998-04-03','F','4245943115',13,1263),(13636631,'Shaeleigh','Richmond','1981-10-29','F','4121453227',25,756),(22481304,'Inga','Heath','1994-01-09','F','4128030664',9,1135);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20511489,'Lee','Mcgee','1983-01-19','F','4147185641',12,377),(24077608,'Evelyn','Ball','1971-06-19','F','4129667625',21,545),(21545290,'Odette','Robertson','1969-03-25','F','4148759393',10,1232),(10467545,'Echo','Newton','1980-11-19','F','4149061385',5,753),(10618377,'Elaine','Perry','1963-05-24','F','4140566395',5,890),(11289631,'Lacey','Christensen','1993-07-07','F','4129102557',23,479),(14588575,'Sydney','Banks','1992-03-25','F','4141717301',3,944),(24602703,'May','Rowland','1990-10-20','F','4241203739',8,885),(17289851,'Mariam','Rosa','1962-03-04','F','4148108238',7,1414),(25475941,'Katelyn','Dale','1975-11-06','F','4163186812',3,1382);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23514715,'Kylynn','Aguilar','1990-03-27','F','4160748813',20,534),(15367579,'Iola','Snow','1964-05-06','F','4124148306',20,1356),(19401110,'Britanni','Haley','1978-01-08','F','4142258203',11,852),(24539963,'Olga','Wilkerson','1980-01-05','F','4127683829',12,933),(19038470,'McKenzie','Merrill','1986-09-30','F','4129547158',10,1237),(13453625,'Lacota','Phelps','1992-07-18','F','4141959637',13,1124),(15985910,'Aileen','Finch','1985-02-12','F','4240578395',16,881),(11319837,'MacKenzie','Cantu','1967-03-02','F','4140357120',2,837),(10526294,'Shana','Freeman','1998-04-16','F','4124847127',8,583),(18130278,'Shelly','Bauer','1988-05-18','F','4142911157',21,1018);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (20674865,'Maya','Rollins','1983-12-10','F','4168974911',2,517),(25236949,'Wendy','Coffey','1995-04-15','F','4140517336',6,1065),(13987804,'Jeanette','Marsh','1996-05-28','F','4243981398',22,1350),(21543655,'Brianna','Stanley','1983-04-23','F','4125982160',2,1269),(16609570,'Portia','Robinson','1997-08-04','F','4120267945',21,1433),(13776085,'Erica','Allison','1960-12-16','F','4146329072',2,375),(14737678,'Bertha','Morrow','1996-08-24','F','4124517240',3,1315),(25422124,'Maryam','Dillard','1968-10-09','F','4147152232',15,742),(19225815,'Charity','Knowles','1978-11-28','F','4120478886',3,531),(18142476,'Jocelyn','Chandler','1961-09-21','F','4125305516',12,1053);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (15603482,'Yuri','Abbott','1986-03-27','F','4122212828',19,1496),(19391177,'Noelle','Wilder','1985-03-12','F','4148500878',25,768),(13820145,'Uma','Jackson','1990-09-12','F','4245745504',22,973),(17655505,'Xantha','Coleman','1967-08-11','F','4246903876',12,1198),(11591519,'Brynne','Keith','1965-09-11','F','4129462797',9,1357),(13583619,'Yuri','Fitzpatrick','1963-01-10','F','4123677569',5,821),(20669401,'Mira','Delacruz','1993-06-03','F','4169287024',17,787),(20277877,'Rhoda','Holcomb','1989-06-24','F','4145250227',8,1271),(17911732,'Charissa','Singleton','1984-08-23','F','4164454020',4,717),(20763113,'Althea','Booth','1965-08-11','F','4166894536',5,1487);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23789030,'Zelda','Mcintosh','1995-07-31','F','4145120844',22,1090),(11203346,'Zenia','Rios','1972-09-27','F','4244887267',13,1201),(12168637,'Brynne','Downs','1988-12-24','F','4123155594',10,1127),(19457517,'Jennifer','Hull','1984-08-11','F','4161341799',19,1347),(15770608,'Unity','Clark','1993-10-26','F','4162183830',2,743),(23762484,'Ariana','Leblanc','1961-03-30','F','4122352573',15,374),(12506320,'Morgan','Cruz','1962-06-08','F','4129390008',18,396),(21957944,'Madonna','Garner','1997-06-27','F','4124283643',11,472),(25388995,'Leila','Hickman','1986-11-12','F','4162264219',16,1046),(11470319,'Xena','Ellis','1977-05-27','F','4144608022',25,677);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (22133653,'Claire','House','1988-02-28','F','4142988050',20,505),(22141541,'Carolyn','Goodwin','1987-03-30','F','4129782507',24,659),(14851681,'Camille','Fleming','1963-06-24','F','4121318246',9,986),(10979010,'Desiree','Joseph','1974-06-14','F','4121916384',1,1395),(11536524,'Odette','Miller','1966-04-07','F','4122953136',4,389),(22885585,'Genevieve','Byers','1992-05-20','F','4167575258',6,1178),(10983549,'Maile','Hale','1989-12-11','F','4168273222',2,1272),(25140345,'Hiroko','Mcgowan','1969-12-24','F','4162323674',21,814),(14171665,'Allegra','Frederick','1975-08-01','F','4245900232',23,1357),(21247985,'Keiko','Hampton','1985-07-11','F','4144190447',3,756);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10093203,'Tatyana','Matthews','1965-04-29','F','4147640832',10,533),(20056832,'Carla','Wiley','1980-01-03','F','4163164752',9,616),(16837911,'Camilla','Calhoun','1960-06-26','F','4247062967',11,1303),(19310710,'Sylvia','Parks','1989-10-20','F','4168810062',4,468),(24263080,'Colleen','Sparks','1979-02-25','F','4128574590',3,420),(20286087,'Britanney','Blankenship','1974-04-15','F','4242239389',19,1330),(16601752,'Ginger','Rosa','1963-05-02','F','4141335143',11,1276),(13598952,'Brielle','Cardenas','1992-03-02','F','4140840786',10,567),(11575859,'Eliana','Ball','1965-12-15','F','4123381815',20,1200),(19143573,'Nora','Kramer','1990-01-26','F','4242878488',9,600);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (25074633,'Delilah','Martinez','1993-11-21','F','4246588877',10,556),(15350428,'Regan','Randolph','1991-08-03','F','4143125243',10,1257),(17324085,'Christen','Ayala','1964-03-05','F','4167095692',23,1475),(21848660,'Phoebe','Cortez','1965-11-13','F','4243302212',21,675),(12581454,'Anjolie','Bond','1975-01-23','F','4168197025',3,801),(10365413,'Yvette','Parsons','1975-10-19','F','4160122890',5,1370),(25917316,'Ingrid','Tyler','1963-02-11','F','4127538713',2,676),(24469697,'Chava','Charles','1991-01-21','F','4249356942',22,622),(21578944,'Sydnee','Douglas','1961-07-29','F','4126914337',1,1421),(18898924,'Charlotte','Joseph','1972-04-25','F','4162031425',20,389);

INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11128204,'Audra','Erickson','1968-08-03','F','4168976511',22,1171),(15177241,'Kimberly','Moody','1983-07-13','F','4122399752',10,1380),(21229476,'Pearl','Henderson','1991-10-22','F','4127224291',23,574),(20290030,'Leigh','Mendoza','1995-05-15','F','4126820641',6,446),(17389495,'Hanna','Rosales','1995-04-19','F','4123362061',14,940),(10447012,'Wynne','Mendoza','1964-02-21','F','4146309475',24,1042),(11200194,'Hedda','Brennan','1972-07-22','F','4146394176',6,873),(14859912,'Joelle','Vance','1978-06-25','F','4168417719',11,688),(10134741,'Yen','Cotton','1993-10-26','F','4144273215',21,1302),(18067814,'Chava','Howard','1961-06-28','F','4245898148',1,707);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (10228621,'Kitra','Duke','1994-05-08','F','4166634771',14,514),(24742104,'Melodie','Stark','1992-06-18','F','4242920087',22,512),(19755482,'Robin','Shepherd','1965-02-10','F','4142348482',24,1225),(11144132,'Stella','Little','1992-12-06','F','4165298255',7,436),(21632711,'Mia','Hunter','1962-10-09','F','4248492441',18,951),(15334502,'Heidi','Valencia','1974-02-27','F','4165790956',9,524),(17610749,'Chiquita','Gonzalez','1983-09-27','F','4141518880',21,973),(16293097,'Violet','Mayer','1960-07-09','F','4160008356',15,564),(22201591,'Yvette','Dillon','1994-06-07','F','4120078019',21,1257),(21201586,'Quemby','Vargas','1961-10-01','F','4125056726',15,604);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (18902946,'Patricia','Burton','1969-11-12','F','4162679844',18,1164),(24082612,'Blaine','Morrison','1980-04-07','F','4169255598',21,813),(11700195,'Mia','Keith','1970-06-30','F','4143112707',4,1359),(14092418,'Pascale','Reed','1977-08-27','F','4245737595',11,1409),(10837345,'Tamekah','Moon','1990-10-13','F','4163879576',2,718),(13689826,'Serena','Massey','1993-11-17','F','4120975071',14,1457),(14915168,'Eleanor','Jacobson','1966-03-18','F','4160451408',19,1433),(22272914,'Hayfa','Juarez','1995-10-22','F','4142925433',9,770),(23615175,'Constance','Turner','1980-07-12','F','4144327003',23,1226),(25719849,'Mallory','Dodson','1972-06-13','F','4248856488',15,511);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (17904661,'Christine','Espinoza','1988-11-26','F','4165374725',14,1316),(24586226,'Kirsten','Holden','1994-11-21','F','4126985311',9,1458),(11364265,'Shelley','Berry','1993-08-24','F','4126385871',25,886),(21230151,'Audrey','Peterson','1960-10-26','F','4245234536',24,946),(24500580,'Fredericka','Barber','1962-03-11','F','4126518155',15,1493),(10141382,'Katelyn','Black','1967-10-25','F','4124374828',20,1241),(19714602,'Lareina','Clark','1986-11-07','F','4141465943',1,411),(22366514,'Rana','Fernandez','1964-05-23','F','4249622173',11,1283),(18472911,'Kim','Levy','1987-02-01','F','4165898831',12,898),(19649814,'Germane','Tucker','1986-06-05','F','4241830629',11,1275);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (11283274,'Martena','Murphy','1969-11-05','F','4129494607',16,1323),(25026051,'Guinevere','Rodriquez','1989-11-15','F','4120186856',12,1400),(18833938,'Maite','Everett','1961-07-30','F','4246485133',12,1111),(20348436,'Emma','Sanford','1972-05-04','F','4143441830',14,785),(10776804,'Jada','Butler','1994-02-21','F','4168823413',21,558),(23205596,'Kendall','Graves','1964-01-21','F','4126023950',16,397),(14538936,'Althea','Trujillo','1977-07-29','F','4162137906',18,971),(21336320,'Alexa','Pope','1971-09-16','F','4148836717',7,1121),(17234972,'Darrel','George','1986-08-01','F','4168080029',13,995),(19792902,'Scarlet','Lee','1981-01-28','F','4140340786',8,741);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (13982021,'Tasha','Holder','1996-10-31','F','4240963312',25,886),(13762918,'Eden','Lowe','1988-08-07','F','4125023592',24,1486),(16364851,'Imelda','Cardenas','1981-12-30','F','4120035091',19,1399),(12773673,'Hiroko','Villarreal','1989-04-15','F','4121377127',23,1205),(17947455,'Shay','Webster','1974-05-18','F','4160479480',12,601),(18712809,'Quin','Sykes','1961-04-05','F','4167193103',2,483),(21378035,'Ruby','Joyner','1980-10-10','F','4163529492',22,474),(22818828,'Penelope','Lindsay','1962-02-09','F','4246308581',14,713),(16233474,'Blaine','Boone','1968-11-28','F','4161639820',18,804),(17359047,'Brynn','Burgess','1994-11-14','F','4245931488',3,1019);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23050354,'Joan','Serrano','1995-04-16','F','4141276753',22,1215),(17177057,'Bertha','Morse','1993-07-28','F','4240100791',6,1339),(15144680,'Clementine','Stone','1961-08-14','F','4160867532',14,653),(25812208,'Ebony','Parrish','1976-07-22','F','4123736767',20,1306),(15401831,'Bree','Foreman','1976-02-09','F','4167907725',17,1319),(14405292,'Cleo','Wood','1988-08-29','F','4129955594',19,772),(12907656,'Maisie','Washington','1969-01-15','F','4121892556',22,626),(21407514,'Natalie','Mccray','1981-01-15','F','4141904522',9,1198),(17099621,'Nelle','Blevins','1981-10-13','F','4149271449',19,1191),(11254935,'Vivien','Garrison','1963-09-05','F','4160064871',9,1114);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (23138398,'Lisandra','Cummings','1986-05-13','F','4123160559',13,614),(20849819,'India','Price','1962-08-31','F','4243843878',1,951),(19889612,'Brenna','Sims','1994-05-02','F','4148367871',12,391),(19007489,'Fleur','Richmond','1968-06-22','F','4249711702',24,1160),(17600719,'Inez','Combs','1985-01-13','F','4241247221',12,1128),(12097075,'Jenna','Chen','1978-07-09','F','4140195789',7,1247),(19332238,'Daria','Luna','1966-11-10','F','4243281235',12,1194),(18534058,'Shelley','Burton','1978-08-10','F','4141403475',19,1474),(17157633,'Gay','Lindsay','1967-07-18','F','4241373072',22,850),(17433038,'Rachel','Brock','1981-07-06','F','4123646109',9,843);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (19421630,'Irma','Murphy','1963-09-01','F','4243330342',25,763),(10825285,'MacKensie','Cote','1984-03-13','F','4127350470',8,644),(18705402,'Myra','Nielsen','1995-04-26','F','4121682814',13,1251),(21688557,'Liberty','Buchanan','1988-01-16','F','4121608582',1,1222),(10970256,'Lydia','Miranda','1988-12-15','F','4148544136',3,1491),(15586155,'Alika','Gillespie','1985-07-24','F','4146075416',16,1247),(25642117,'Ebony','Dominguez','1980-04-27','F','4242066201',6,642),(13187131,'Charity','Whitney','1964-11-02','F','4162498808',22,1355),(19625266,'Lunea','Vasquez','1994-11-18','F','4145556426',12,1160),(21278212,'Barbara','Moses','1989-01-24','F','4243918560',22,1152);
INSERT INTO EMPLEADO (emp_cedula,emp_nombre,emp_apellido,emp_fechanacimiento,emp_genero,emp_telefono,fk_emp_cargo,fk_emp_lugar) VALUES (14190572,'Sonya','Fletcher','1984-09-22','F','4243887728',3,1369),(16195788,'Cecilia','Mcmillan','1988-06-12','F','4165087553',25,1236),(25983434,'Kalia','Simmons','1967-06-07','F','4168181656',14,1070),(18016458,'Bethany','Villarreal','1989-12-19','F','4147415564',24,627),(24464142,'Michelle','Sykes','1982-04-14','F','4161861763',2,826),(19469651,'Karly','Hurst','1966-11-16','F','4246214254',24,951),(18160401,'Geraldine','Cruz','1975-11-06','F','4240007776',4,1355),(13748822,'Catherine','Cummings','1996-04-04','F','4246453109',17,481),(10038576,'Lana','Dennis','1966-02-17','F','4166839017',15,845),(14663649,'Deborah','Nielsen','1961-09-24','F','4123586157',3,920);


	INSERT INTO USUARIO (USU_USUARIO,USU_PASSWORD,FK_USU_EMPLEADO,FK_USU_ROL)
	VALUES ('mfraga','admin',1,1);
	INSERT INTO USUARIO (USU_USUARIO,USU_PASSWORD,FK_USU_EMPLEADO,FK_USU_ROL)
	VALUES ('aalberto','admin',2,1);
	INSERT INTO USUARIO (USU_USUARIO,USU_PASSWORD,FK_USU_EMPLEADO,FK_USU_ROL)
	VALUES ('zchang','admin',3,1);
	INSERT INTO USUARIO (USU_USUARIO,USU_PASSWORD,FK_USU_EMPLEADO,FK_USU_ROL)
	VALUES ('aloro','admin',4,1);
	INSERT INTO usuario ( usu_usuario, usu_password, fk_usu_empleado, fk_usu_rol) VALUES ('Bretth', 'clave', 5, 2);

	INSERT INTO presentacion(pre_codigo, pre_nombre)
	VALUES 
	(nextval('presentacion_pre_codigo_seq'), 'Laminas'),
	(nextval('presentacion_pre_codigo_seq'), 'Lingotes'),
	(nextval('presentacion_pre_codigo_seq'), 'Fino'),
	(nextval('presentacion_pre_codigo_seq'), 'Grueso'),
	(nextval('presentacion_pre_codigo_seq'), 'Pellas'),
	(nextval('presentacion_pre_codigo_seq'), 'Briquetas');

	INSERT INTO presentacion(pre_codigo, pre_nombre)
	VALUES 
	(nextval('presentacion_pre_codigo_seq'), 'Cilindro'),
	(nextval('presentacion_pre_codigo_seq'), 'Liquido'),
	(nextval('presentacion_pre_codigo_seq'), 'Planchon');

	INSERT INTO tipo_maquinaria (tm_nombre)
	VALUES 
	('Celda Electrolitica'),
	('Horno de Retención'),
	('Laminadora'),
	('Grua'),
	('Planta de aderezo'),
	('Separador Magnetico'),
	('Perforadora'),
	('Vehiculo');
	

	INSERT INTO ALIADO_COMERCIAL(AC_NUMERO_RIF, AC_NOMBRE, AC_TELEFONO, FK_AC_LUGAR)
		VALUES
		-- AMAZONAS
		('G-215656985', 'CVG MINERAZONA', 2481698975, 368),
		('G-245944489', 'CARBON GUAYANA', 2485998623, 368),
		-- ANZOÁTEGUI
		('G-215684565', 'CVG CONACAL', 2812650403, 389),
		('G-245987894', 'DIORCA INDUSTRIAL', 2812767933, 407),
		-- APURE
		('G-205689999', 'EMINERALCA', 2408998723, 450),
		('G-225688566', 'CVG BIFAMINAS', 2812767933, 450),
		-- ARAGUA
		('G-205656895', 'METALUNCA', 2435536866, 459),
		('G-212356498', 'INDUSTRIA PERLEBER', 2435516495, 459),
		-- BARINAS
		('G-225236532', 'BARIMINAS', 2732756537, 527),
		('G-212356499', 'INDUSTRIA PERLEBER', 2435516495, 530),
		-- BOLÍVAR
		('G-200047062', 'CVG VENALUM', 2869705466, 576),
		('G-201109229', 'CVG ALCASA', 2869801630, 576),
		('G-205556895', 'CVG BAUXILUM', 2869506271, 576),
		('G-205965779', 'CVG MINERVEN', 2887620712, 588),
		('G-205965789', 'CVG CARBONORCA', 2869806231, 576),
		-- CARABOBO
		('G-202356562', 'METALES AVILA', 2456398236, 627),
		('G-245696633', 'CORPORO CARABOBO', 2455557989, 631),
		-- COJEDES
		('G-195563562', 'MINEC', 2582148785, 670),
		('G-202020113', 'TINACO METALES', 2582916565, 670),
		-- DTO. CAPITAL
		('G-214569823', 'COMERMIN', 4128205403, 1494),
		('G-216239856', 'EBSMN', 2125779631, 1493),
		-- DELTA AMACURO
		('G-211365566', 'PRODELTA', 2872226513, 671),
		('G-218976323', 'IMATACA INDUSTRIAS', 2876561323, 677),
		-- FALCON
		('G-205667898', 'ASOFAL', 2698951264, 702),
		('G-201475214', 'INTRA MINERVA', 2698953168, 702),
		-- GUARICO
		('G-212356985', 'MINERSOSA', 2465342113, 794),
		('G-209126552', 'CORPORACION LOS LLANOS', 2466385971, 793),
		-- LARA
		('G-195896587', 'MINERALES TAMACA', 2517845221, 826),
		('G-222265335', 'CARBOLARA', 2512514337, 825),
		-- MERIDA
		('G-207896527', 'ANDES METALICOS', 2714683261, 930),
		('G-215465322', 'EXPLOTACIONES MERIDA', 2718956432, 930),
		-- MIRANDA
		('G-201233219', 'MINERALITICA', 2125856543, 981),
		('G-224575586', 'ALUMIRANDA', 2123656348, 981),
		-- MONAGAS
		('G-185652556', 'CENTRO MINERAL', 2912754821, 1043),
		('G-200056057', 'BAUXVEN', 2912147632, 1044),
		-- NUEVA ESPARTA
		('G-198547552', 'VILLA BAUXITA', 2958746315, 1078),
		('G-205654789', 'MINERCARIBE', 2956896842, 1078),
		-- PORTUGUESA
		('G-201115638', 'INDUGUANARE', 2578452185, 1086),
		('G-216325885', 'PORTORO VENEZUELA', 2578966952, 1088),
		-- SUCRE
		('G-185693652', 'MINERIA VALDEZ', 2935653219, 1173),
		('G-225643588', 'ASOMINCRE', 2932935417, 1158),
		-- TACHIRA
		('G-205898741', 'MINERTACHIRA', 2775487711, 1218),
		('G-195638965', 'PROTAVEN DEL TACHIRA', 2772363513, 1218),
		-- TRUJILLO
		('G-185556589', 'MINERANDES', 2722754631, 1320),
		('G-201356313', 'DIASTRO METALES', 2722933946, 1321),
		-- VARGAS
		('G-222354277', 'SALES VARGAS', 2125585433, 1337),
		('G-224389942', 'MACUTOVEN', 2124556478, 1344),
		-- YARACUY
		('G-202055844', 'CARBON COCOROTE', 2533665873, 1352),
		('G-213699988', 'MINERZUELA', 2535667935, 1352),
		-- ZULIA
		('G-205684983', 'URRI METAL', 2656310483, 1450),
		('G-203568985', 'EMULCA', 2617541587, 1435);

		INSERT INTO explotacion(
			EXP_CODIGO, EXP_FECHAINICIO, EXP_FECHAFIN,	EXP_COSTOTOTAL,
			FK_EXP_ESTATUS,	FK_EXP_VENTA )
			VALUES
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null),
			(nextval('explotacion_exp_codigo_seq'), null, null, null, 1, null);


	INSERT INTO yacimiento(
	yac_codigo, yac_extension, yac_fecharegistro, yac_nombre, fk_yac_estatus, fk_yac_lugar, fk_yac_explotacion)
	VALUES 

	--AMAZONAS 
	(nextval('yacimiento_yac_codigo_seq'), 8000 , '2008-06-14', 'Cuenca del Orinoco', 1 , 363, 1),
	(nextval('yacimiento_yac_codigo_seq'), 20000, '2001-02-03', 'Yapacana', 6 , 366, 2),
	(nextval('yacimiento_yac_codigo_seq'), 15000, '2005-04-01', 'Munduapo', 1 , 375, 3),
	(nextval('yacimiento_yac_codigo_seq'), 1000, '2006-02-25', 'Cocuy', 1 , 383, 4),
	(nextval('yacimiento_yac_codigo_seq'), 3000, '2002-02-25', 'Platanillal', 1 , 372, null),

	-- ANZOATEGUI
	(nextval('yacimiento_yac_codigo_seq'), 6000 , '2017-06-14', 'Peñas Blancas', 1 , 389, 5),
	(nextval('yacimiento_yac_codigo_seq'), 14000, '2014-06-12', 'Del Piar', 6 , 407, 6),
	(nextval('yacimiento_yac_codigo_seq'), 3500 , '2011-06-14', 'Mallorquín', 1 , 439, 7),
	(nextval('yacimiento_yac_codigo_seq'), 8000 , '2004-08-16', 'Capiricual', 6 , 439, 8),
	(nextval('yacimiento_yac_codigo_seq'), 6000, '2006-05-01', 'Fila Maestra', 1 , 391, null),

	--APURE
	(nextval('yacimiento_yac_codigo_seq'), 4300, '2014-06-12', 'Galera de Cinaruco', 1 , 460, 9),
	(nextval('yacimiento_yac_codigo_seq'), 7000 , '2010-02-25', 'Mantecal', 2 , 451, 10),
	(nextval('yacimiento_yac_codigo_seq'), 11000 , '2008-02-25', 'Biruaca', 1 , 449, 11),
	(nextval('yacimiento_yac_codigo_seq'), 3200 , '2006-02-25', 'El Yagual', 1 , 445, 12),
	(nextval('yacimiento_yac_codigo_seq'), 10000 , '2002-05-25', 'El Peñal', 1 , 467, null),


	--ARAGUA
	(nextval('yacimiento_yac_codigo_seq'), 3600 , '2016-06-13', 'Villa del Cura', 1 , 516, 13),
	(nextval('yacimiento_yac_codigo_seq'), 21000 , '2001-12-05', 'Santa Isabel', 6 , 480, 14),
	(nextval('yacimiento_yac_codigo_seq'), 6400 , '2008-07-29', 'Taguay', 6 , 510, 15),
	(nextval('yacimiento_yac_codigo_seq'), 7200, '2016-03-15', 'Loma de Hierro', 1 , 506, 16),
	(nextval('yacimiento_yac_codigo_seq'), 6000 , '2011-05-16', 'Las Lajitas', 1 , 505, null),

	--BARINAS
	(nextval('yacimiento_yac_codigo_seq'), 5000 , '2012-12-06', 'Ciudad Bolivia', 6 , 559, 17),
	(nextval('yacimiento_yac_codigo_seq'), 7000 , '2002-02-25', 'Santa Rosa', 1 , 565, 18),
	(nextval('yacimiento_yac_codigo_seq'), 9200 , '2015-05-13', 'Ticoporo', 6 , 524, 19),
	(nextval('yacimiento_yac_codigo_seq'), 18000 , '2006-04-05', 'Barinitas', 1 , 545, 20),
	(nextval('yacimiento_yac_codigo_seq'), 1000, '2002-02-05', 'Guadarrama', 1 , 528, null),

	--BOLIVAR
	(nextval('yacimiento_yac_codigo_seq'), 15 , '2005-04-01', 'Punta de Cerro', 6 , 601, 21),
	(nextval('yacimiento_yac_codigo_seq'), 9200 , '2006-09-06', 'Pico Cerro Paja', 1 , 602, 22),
	(nextval('yacimiento_yac_codigo_seq'), 8600 , '1998-05-02', 'El Pao', 6 , 600, 23),
	(nextval('yacimiento_yac_codigo_seq'), 12000, '1999-09-03', 'Del Callao', 6 , 588, 24),
	(nextval('yacimiento_yac_codigo_seq'), 30000 , '2009-05-07', 'El Dorado', 1 , 610, null),

	--CARABOBO
	(nextval('yacimiento_yac_codigo_seq'), 7800 , '2014-06-05', 'Santa Rosa BB', 6 , 654, 25),
	(nextval('yacimiento_yac_codigo_seq'), 10000 , '2012-11-06', 'Gañango', 6 , 639, 26),
	(nextval('yacimiento_yac_codigo_seq'), 1000 , '2017-07-08', 'Guacara', 6 , 627, 27),
	(nextval('yacimiento_yac_codigo_seq'), 25000 , '2002-02-25', 'Yagua', 6 , 628, 28),
	(nextval('yacimiento_yac_codigo_seq'), 6700 , '2012-08-13', 'Los Guayos', 1 , 633, null),

	--COJEDES 
	(nextval('yacimiento_yac_codigo_seq'), 9200, '2017-07-21', 'Tinaquillo', 6 , 658, 29),
	(nextval('yacimiento_yac_codigo_seq'), 10000 , '2015-11-22', 'San Carlos', 1 , 658, 30),
	(nextval('yacimiento_yac_codigo_seq'), 7000 , '2002-02-25', 'Macapo', 1 , 662, 31),
	(nextval('yacimiento_yac_codigo_seq'), 6000 , '2017-07-17', 'La Aguadita', 1 , 661, 32),
	(nextval('yacimiento_yac_codigo_seq'), 8000, '2002-02-25', 'Amparo', 1 , 664, null),

	--DELTA AMACURO
	(nextval('yacimiento_yac_codigo_seq'), 5000, '2003-06-28', 'Imataca', 6 , 677, 33),
	(nextval('yacimiento_yac_codigo_seq'), 4000 , '2018-11-04', 'Piacoa', 6 , 679, 34),
	(nextval('yacimiento_yac_codigo_seq'), 7800 , '2017-12-04', 'Los Castillos', 6 , 681, 35),
	(nextval('yacimiento_yac_codigo_seq'), 4500 , '2008-11-04', 'La Represalia', 1 , 676, 36),
	(nextval('yacimiento_yac_codigo_seq'), 9200, '2006-06-19', 'Sacupana', 1 , 679, null),


	--FALCON
	(nextval('yacimiento_yac_codigo_seq'), 11000, '2003-11-18', 'El Trueno', 1 , 740, 37),
	(nextval('yacimiento_yac_codigo_seq'), 9200 , '2005-06-12', 'Mauroa', 1 , 743, 38),
	(nextval('yacimiento_yac_codigo_seq'), 11200, '2014-06-13', 'Septentrional', 1 , 692, 39),
	(nextval('yacimiento_yac_codigo_seq'), 6300 , '2016-02-22', 'El Saladillo', 1 , 699, 40),
	(nextval('yacimiento_yac_codigo_seq'), 14500 , '2012-11-25', 'El Cantil', 1 , 747, null),


	--GUARICO 
	(nextval('yacimiento_yac_codigo_seq'), 19000, '2007-10-15', 'Sabana Grande', 1 , 783, 41),
	(nextval('yacimiento_yac_codigo_seq'), 5200 , '2013-04-06', 'Jabilillal', 1 , 781, 42),
	(nextval('yacimiento_yac_codigo_seq'), 5600 , '2015-07-13', 'El Corozo', 1 , 798, 43),
	(nextval('yacimiento_yac_codigo_seq'), 17000 , '2018-11-04', 'Serrania del Interior', 6 , 801, 44),
	(nextval('yacimiento_yac_codigo_seq'), 2050, '2012-02-25', 'El chino', 1 , 805, null),


	--LARA 
	(nextval('yacimiento_yac_codigo_seq'), 4500, '2006-09-01', 'El Tocuyo',6 , 846, 45),
	(nextval('yacimiento_yac_codigo_seq'), 8560 , '2003-11-07', 'San Jacinto',6 , 823, 46),
	(nextval('yacimiento_yac_codigo_seq'), 16000, '2006-09-15', 'Los Caballos', 6, 861, 47),
	(nextval('yacimiento_yac_codigo_seq'), 13000 , '2012-01-25', 'Carorita', 1 , 827, 48),
	(nextval('yacimiento_yac_codigo_seq'), 1400 , '2002-02-01', 'Quibor', 1 , 832, null),

	--MERIDA
	(nextval('yacimiento_yac_codigo_seq'), 6500 , '2002-02-02', 'Las Tapias', 1 , 919, 49),
	(nextval('yacimiento_yac_codigo_seq'), 9600 , '2009-01-25', 'El Tigre', 1 , 958, 50),
	(nextval('yacimiento_yac_codigo_seq'), 15000 , '2012-12-05', 'Zea', 1 , 959, 51),
	(nextval('yacimiento_yac_codigo_seq'), 6200, '2016-11-04', 'Guaraque', 6 , 905, 52),
	(nextval('yacimiento_yac_codigo_seq'), 9000 , '2012-02-25', 'Rio Negro', 1 , 907, null),

	--MIRANDA
	(nextval('yacimiento_yac_codigo_seq'), 4562, '2006-02-06', 'El Carrizo', 1 , 977, 53),
	(nextval('yacimiento_yac_codigo_seq'), 7540 , '2010-10-23', 'Capaya', 1 , 962, 54),
	(nextval('yacimiento_yac_codigo_seq'), 12400, '2018-11-04', 'Colonia Ocumare', 6 , 992, 55),
	(nextval('yacimiento_yac_codigo_seq'), 4510, '2018-11-04', 'Colonia Mendoza', 6 , 992, 56),
	(nextval('yacimiento_yac_codigo_seq'), 4620, '2002-02-25', 'Tacata', 1 , 987, null),

	--MONAGAS
	(nextval('yacimiento_yac_codigo_seq'), 4800, '2014-02-15', 'Cerro Azul', 6 , 1052, 57),
	(nextval('yacimiento_yac_codigo_seq'), 7200, '2006-05-12', 'El Guacharo', 1 , 1019, 58),
	(nextval('yacimiento_yac_codigo_seq'), 6500, '2002-02-25', 'Teresen', 1 , 1023, 59),
	(nextval('yacimiento_yac_codigo_seq'), 4500, '2002-02-25', 'La Guanota', 1 , 1020, 60),
	(nextval('yacimiento_yac_codigo_seq'), 1200, '2002-02-25', 'Cachipo', 1 , 1052, null),

	--NUEVA ESPARTA
	(nextval('yacimiento_yac_codigo_seq'), 4530, '2024-02-25', 'Salinas de Pampatar', 6 , 1068, 61),
	(nextval('yacimiento_yac_codigo_seq'), 3000 , '2018-06-13', 'Tubores', 6 , 1075, 62),
	(nextval('yacimiento_yac_codigo_seq'), 4600, '2002-06-25', 'Yaguaraparo', 1 , 1071, 63),
	(nextval('yacimiento_yac_codigo_seq'), 7000, '2014-06-18', 'Zabala', 6 , 1080, 64),
	(nextval('yacimiento_yac_codigo_seq'), 9200, '2002-02-05', 'Los Baleales', 1 , 1076, null),

	--PORTUGUESA
	(nextval('yacimiento_yac_codigo_seq'), 6200 , '2000-06-15', 'Agua Blanca', 1 , 245, 65),
	(nextval('yacimiento_yac_codigo_seq'), 6100 , '2002-02-25', 'Turen', 1 , 1117, 66),
	(nextval('yacimiento_yac_codigo_seq'), 9100, '2002-02-25', 'Santa Cruz', 1 , 1119, 67),
	(nextval('yacimiento_yac_codigo_seq'), 4000, '2002-02-25', 'Guanarito', 6 , 1090, 68),
	(nextval('yacimiento_yac_codigo_seq'), 5000, '2002-02-25', 'La estación', 1 , 1097, null),

	--SUCRE
	(nextval('yacimiento_yac_codigo_seq'), 100 , '2006-02-15', 'El Pilar', 1 , 1130, 69),
	(nextval('yacimiento_yac_codigo_seq'), 1300 , '2003-01-25', 'Paria', 6 , 1173, 70),
	(nextval('yacimiento_yac_codigo_seq'), 5000 , '2001-10-04', 'Araya', 1 , 1144, 71),
	(nextval('yacimiento_yac_codigo_seq'), 11000 , '2013-09-24', 'Ayacucho', 1 , 1169, 72),
	(nextval('yacimiento_yac_codigo_seq'), 6100, '2004-12-02', 'Sucre A', 1 , 1358, null),

	--TACHIRA
	(nextval('yacimiento_yac_codigo_seq'), 4200 , '2011-03-25', 'Lobatera', 1 , 1216, 73),
	(nextval('yacimiento_yac_codigo_seq'), 4300, '2006-09-06', 'Seboruco', 1 , 1233, 74),
	(nextval('yacimiento_yac_codigo_seq'), 13000 , '2008-06-02', 'Delicias', 1 , 1223, 75),
	(nextval('yacimiento_yac_codigo_seq'), 4600, '2011-06-14', 'San Felix', 1 , 1179, 76),
	(nextval('yacimiento_yac_codigo_seq'), 7200, '2011-06-14', 'Rubio', 1 , 1205, null),


	--TRUJILLO
	(nextval('yacimiento_yac_codigo_seq'), 7200 , '2001-01-24', 'San Miguel', 6 , 1258, 77),
	(nextval('yacimiento_yac_codigo_seq'), 4600 , '2015-03-15', 'Mocoy', 6 , 1324 , 78),
	(nextval('yacimiento_yac_codigo_seq'), 7500 , '2015-03-15', 'El progreso', 1 , 1285 , 79),
	(nextval('yacimiento_yac_codigo_seq'), 11000 , '2007-06-19', 'La ceiba', 6 , 1286 , 80),
	(nextval('yacimiento_yac_codigo_seq'), 3500 , '2015-06-30', 'Motatán', 1 , 1296 , null),

	--VARGAS
	(nextval('yacimiento_yac_codigo_seq'), 9400 , '2010-03-15', 'Urimare',6 , 1324 , 81),
	(nextval('yacimiento_yac_codigo_seq'), 8000 , '2015-03-15', 'Naiguata',6 , 1346 , 82),
	(nextval('yacimiento_yac_codigo_seq'), 15000 , '2014-09-03', 'El junko',6 , 1342 , 83),
	(nextval('yacimiento_yac_codigo_seq'), 6920 , '2010-02-15', 'Caruao',6 , 1340 , 84),
	(nextval('yacimiento_yac_codigo_seq'), 4560 , '2011-03-15', 'Carayaca', 1 , 1338 , null),

	--YARACUY
	(nextval('yacimiento_yac_codigo_seq'), 3200 , '2000-03-23', 'Sierra de Aroa', 6 , 1349, 85),
	(nextval('yacimiento_yac_codigo_seq'), 6200 , '2002-02-25', 'Cambimba', 6, 1358, 86),
	(nextval('yacimiento_yac_codigo_seq'), 5200 , '2002-10-25', 'La Trinidad', 1 , 1355, 87),
	(nextval('yacimiento_yac_codigo_seq'), 18000 , '2011-11-11', 'Monge', 6 , 1356, 88),
	(nextval('yacimiento_yac_codigo_seq'), 3200 , '2008-03-25', 'Sucre', 1 , 1365, null),

	--ZULIA
	(nextval('yacimiento_yac_codigo_seq'), 45000 , '2012-09-01', 'Guasare', 6 , 1425, 89),
	(nextval('yacimiento_yac_codigo_seq'), 6200 , '2010-06-25', 'Cachirí', 6 , 1425, 90),
	(nextval('yacimiento_yac_codigo_seq'), 7800 , '2013-06-14', 'El carrasquero', 1 , 1426, 91),
	(nextval('yacimiento_yac_codigo_seq'), 3200 , '2002-01-07', 'Socuy', 6 , 1423, 92),
	(nextval('yacimiento_yac_codigo_seq'), 9200 , '2015-04-25', 'Inciarte', 1 , 1427, null),

	--DISTRITO CAPITAL

	(nextval('yacimiento_yac_codigo_seq'), 10000 , '2014-09-16', 'Altagracia', 6 , 1476 , 93),
	(nextval('yacimiento_yac_codigo_seq'), 6200 , '2015-03-15', 'San Pedro', 1 , 1493 , 94),
	(nextval('yacimiento_yac_codigo_seq'), 7500 , '2015-03-15', 'Macarao', 1 , 1488 , 95),
	(nextval('yacimiento_yac_codigo_seq'), 8000, '2011-06-01', 'San Juan', 1 , 1492 , 96),
	(nextval('yacimiento_yac_codigo_seq'), 9200 , '2015-03-15', 'San Jose', 1 , 1491 , null);

	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (25218800,'Evan','Kent', 4241539278,1155);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (10317314,'Emerson','Zamora', 4261666792 ,1207);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (16540327,'Mercedes','Abbott', 4245477306,881);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (15728336,'Jameson','Pratt',4260625430,1361);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (23376628,'Leila','Brock',4249507252,815);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (20156324,'Ciara','Dawson',4265922660,743);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (14589174,'Casey','Gilliam', 4265351416,701);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (16284862,'Winifred','Pearson',4244442504,691);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (14222213,'Felix','Raymond',4260410982,1130);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (18462682,'Caryn','Robles',4244451359,475);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (20383299,'Zia','Macdonald',4243592499,1050);
	INSERT INTO cliente (cli_cedula,cli_nombre,cli_apellido,cli_telefono,fk_cli_lugar) VALUES (24617599,'September','Odom',4269110537,377);


	INSERT INTO min_metalico
	(met_codigo, met_nombre, met_escalamaleabilidad, met_escaladureza)
		VALUES 
		(nextval('min_metalico_met_codigo_seq'), 'Aluminio', 4, 3 ),
		(nextval('min_metalico_met_codigo_seq'), 'Cobre', 3, 3 ),
		(nextval('min_metalico_met_codigo_seq'), 'Niquel', 6, 5),
		(nextval('min_metalico_met_codigo_seq'), 'Zinc', 4, 3 ),
		(nextval('min_metalico_met_codigo_seq'), 'Oro', 2, 2 ),
		(nextval('min_metalico_met_codigo_seq'), 'Plata', 3, 3 ),
		(nextval('min_metalico_met_codigo_seq'), 'Hierro', 5, 4 ),
		(nextval('min_metalico_met_codigo_seq'), 'Mercurio', 3, 1 ),
		(nextval('min_metalico_met_codigo_seq'), 'Calcio', 2 , 1 ),
		(nextval('min_metalico_met_codigo_seq'), 'Platino', 2 , 1 ),
		(nextval('min_metalico_met_codigo_seq'), 'Magnesio', 6 , 3 ),
		(nextval('min_metalico_met_codigo_seq'), 'Manganeso', 2 , 5 ),
		(nextval('min_metalico_met_codigo_seq'), 'Bario', 4, 1 );

	INSERT INTO min_no_metalico(
		nom_codigo, nom_nombre, nom_utilidad)
		VALUES 
		(nextval('min_no_metalico_nom_codigo_seq'), 'Carbon', 'Generación de electricidad'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Talco', 'Cosmetica'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Mica', 'Aislante Electrico'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Sal', 'Cocina'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Yeso', 'Fertilizante'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Vitrita', null),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Fusita', null),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Clarita', null),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Durita', 'Pegamento'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Diamante', 'Industria Joyera'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Caolin', 'Pigmento'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Arena', 'Cristales y hormigón'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Fosfato', 'Industria Alimenticia'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Marmol', 'Decoración'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Caliza', 'Fabricación de cemento'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Azufre', 'Fertilizante'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Cal', 'Construcción de viviendas'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Granito', 'Construcción de viviendas'),
		(nextval('min_no_metalico_nom_codigo_seq'), 'Arcilla', 'Fabricación de cemento'),	
		(nextval('min_no_metalico_nom_codigo_seq'), 'Baritina', 'Pigmento');
		insert into min_no_metalico (nom_nombre) values ('Silice');



		INSERT INTO min_min (mm_proporcionm1m2, fk_mm_1nometalico, fk_mm_2nometalico) VALUES (0.2,6,1),(0.3,7,1),(0.1,8,1),(0.3,9,1);

		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.3,8,7),(0.1,2,8),(0.2,6,1),(0.5,1,13),(0.1,1,4);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.3,8,9),(0.1,6,2),(0.5,12,5),(0.4,9,8);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.4,4,7),(0.3,11,5),(0.5,9,11),(0.2,9,7),(0.2,11,9);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.1,11,2),(0.3,12,8),(0.4,5,8),(0.3,8,10),(0.5,1,3);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.2,3,8),(0.4,6,13),(0.1,11,7),(0.1,9,5),(0.2,7,11);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.4,7,6),(0.1,11,4),(0.5,7,11),(0.5,11,6),(0.3,13,11);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1metalico,fk_mm_2metalico) VALUES (0.1,8,13),(0.3,2,12),(0.5,6,4),(0.4,13,5),(0.1,8,2);

		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1nometalico,fk_mm_2nometalico) VALUES (0.1,1,8),(0.3,12,13),(0.4,3,10),(0.5,8,10),(0.4,14,3);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1nometalico,fk_mm_2nometalico) VALUES (0.1,9,7),(0.1,13,3),(0.1,8,10),(0.3,10,5),(0.2,13,18);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1nometalico,fk_mm_2nometalico) VALUES (0.5,2,10),(0.2,9,17),(0.4,14,11),(0.5,20,3),(0.3,15,14);
		INSERT INTO MIN_MIN (mm_proporcionm1m2,fk_mm_1nometalico,fk_mm_2nometalico) VALUES (0.4,3,11),(0.2,11,9),(0.5,15,9),(0.5,7,3),(0.3,16,11);

		INSERT INTO ali_mm (fk_amm_aliado,fk_amm_mm) VALUES ('G-200047062',1),('G-201109229',2),('G-205556895',6),('G-205965779',3),('G-205965789',1),('G-222265335',3),('G-202055844',1),('G-245944489',2);


		INSERT INTO yac_min(
	ym_codigo, fk_ym_yacimiento, fk_ym_minmetalico, fk_ym_minnometalico, ym_cantidad)
		VALUES 
		--AMAZONAS
		(nextval('yac_min_ym_codigo_seq'), 1, 1 , null , 8000),
		(nextval('yac_min_ym_codigo_seq'), 2, null, 7, 75000),
		(nextval('yac_min_ym_codigo_seq'), 3, null, 1, 25000000),
		(nextval('yac_min_ym_codigo_seq'), 4, 2, null, 360000),
		(nextval('yac_min_ym_codigo_seq'), 5, null, 1, 65000000),

		--ANZOATEGUI
		(nextval('yac_min_ym_codigo_seq'), 6, null , 15 , 10000),
		(nextval('yac_min_ym_codigo_seq'), 7, null, 21, 25000),
		(nextval('yac_min_ym_codigo_seq'), 8, null, 1, 5000000),
		(nextval('yac_min_ym_codigo_seq'), 9, null, 20, 60000),
		(nextval('yac_min_ym_codigo_seq'), 10, null, 1, 650000),

		--APURE
		(nextval('yac_min_ym_codigo_seq'), 11, 7 , null , 18000000),
		(nextval('yac_min_ym_codigo_seq'), 12, null, 17, 7000),
		(nextval('yac_min_ym_codigo_seq'), 13, null, 1, 4000000),
		(nextval('yac_min_ym_codigo_seq'), 14, null, 1, 90000000),
		(nextval('yac_min_ym_codigo_seq'), 15, null, 1, 650000),

		--ARAGUA
		(nextval('yac_min_ym_codigo_seq'), 16, 2 , null , 80000),
		(nextval('yac_min_ym_codigo_seq'), 17, 3, null, 5000),
		(nextval('yac_min_ym_codigo_seq'), 17, 2, null, 130000),
		(nextval('yac_min_ym_codigo_seq'), 17, 4, null, 4000),
		(nextval('yac_min_ym_codigo_seq'), 18, null, 16, 120000),
		(nextval('yac_min_ym_codigo_seq'), 19, 4, null, 120000),
		(nextval('yac_min_ym_codigo_seq'), 19, 3, null, 70000),
		(nextval('yac_min_ym_codigo_seq'), 20, null, 1, 5000000),

		--BARINAS
		(nextval('yac_min_ym_codigo_seq'), 21, 5 , null , 180500),
		(nextval('yac_min_ym_codigo_seq'), 22, 1, null, 7000),
		(nextval('yac_min_ym_codigo_seq'), 23, 3, null, 500000),
		(nextval('yac_min_ym_codigo_seq'), 24, null, 1, 60000000),
		(nextval('yac_min_ym_codigo_seq'), 25, 11, null, 7000),

		--BOLIVAR
		(nextval('yac_min_ym_codigo_seq'), 26, 13 , null , 16000000),
		(nextval('yac_min_ym_codigo_seq'), 27, 7, null, 258000000),
		(nextval('yac_min_ym_codigo_seq'), 28, 7, null, 25000000),
		(nextval('yac_min_ym_codigo_seq'), 29, 5, null, 9000),
		(nextval('yac_min_ym_codigo_seq'), 30, null, 1, 650000),

		--CARABOBO
		(nextval('yac_min_ym_codigo_seq'), 31, null, 14 , 18050),
		(nextval('yac_min_ym_codigo_seq'), 32, null, 18, 700),
		(nextval('yac_min_ym_codigo_seq'), 33, null, 16, 5000),
		(nextval('yac_min_ym_codigo_seq'), 34, null, 11, 600000),
		(nextval('yac_min_ym_codigo_seq'), 35, 3, null, 7050),

		--COJEDES
		(nextval('yac_min_ym_codigo_seq'), 36, 3 , null , 90000),
		(nextval('yac_min_ym_codigo_seq'), 37, 11, null, 25000),
		(nextval('yac_min_ym_codigo_seq'), 38, 1, null, 23000),
		(nextval('yac_min_ym_codigo_seq'), 39, 7, null, 900000),
		(nextval('yac_min_ym_codigo_seq'), 40, 11, null, 6500000),

		--DELTA AMACURO
		(nextval('yac_min_ym_codigo_seq'), 41, 7, null , 1850),
		(nextval('yac_min_ym_codigo_seq'), 41, 12, null , 1500),
		(nextval('yac_min_ym_codigo_seq'), 41, 13, null , 10000),
		(nextval('yac_min_ym_codigo_seq'), 41, null, 11 , 50000),
		(nextval('yac_min_ym_codigo_seq'), 41, null, 14 , 2000),
		(nextval('yac_min_ym_codigo_seq'), 42, null, 12, 7000),
		(nextval('yac_min_ym_codigo_seq'), 43, 9, null, 5000),
		(nextval('yac_min_ym_codigo_seq'), 44, null, 13, 600000),
		(nextval('yac_min_ym_codigo_seq'), 45, 7, null, 7050),

		--FALCON
		(nextval('yac_min_ym_codigo_seq'), 46, 7 , null , 150000000),
		(nextval('yac_min_ym_codigo_seq'), 47, null, 7, 7000000),
		(nextval('yac_min_ym_codigo_seq'), 48, null, 1, 210000),
		(nextval('yac_min_ym_codigo_seq'), 49, null, 1, 700000),
		(nextval('yac_min_ym_codigo_seq'), 50, null, 15, 650000),

		--GUARICO
		(nextval('yac_min_ym_codigo_seq'), 51, null, 1 , 42000),
		(nextval('yac_min_ym_codigo_seq'), 52, 3, null, 7000),
		(nextval('yac_min_ym_codigo_seq'), 53, null, 9, 51000),
		(nextval('yac_min_ym_codigo_seq'), 54, null, 7, 6400000),
		(nextval('yac_min_ym_codigo_seq'), 55, 2, null, 700500),

		--LARA
		(nextval('yac_min_ym_codigo_seq'), 56, null, 6 , 150000),
		(nextval('yac_min_ym_codigo_seq'), 57, null, 19, 8000),
		(nextval('yac_min_ym_codigo_seq'), 58, null, 19, 6000),
		(nextval('yac_min_ym_codigo_seq'), 59, 7, null, 7000),
		(nextval('yac_min_ym_codigo_seq'), 60, 8, null, 6500),

		--MERIDA
		(nextval('yac_min_ym_codigo_seq'), 61, 2, null , 40000),
		(nextval('yac_min_ym_codigo_seq'), 62, 2, null, 8000),
		(nextval('yac_min_ym_codigo_seq'), 63, null, 1, 51000),
		(nextval('yac_min_ym_codigo_seq'), 64, 9, null, 90000),
		(nextval('yac_min_ym_codigo_seq'), 65, 7, null, 700500),

		--MIRANDA
		(nextval('yac_min_ym_codigo_seq'), 66, 2, null , 15000),
		(nextval('yac_min_ym_codigo_seq'), 67, 7, null, 70000),
		(nextval('yac_min_ym_codigo_seq'), 68, null, 14, 150000),
		(nextval('yac_min_ym_codigo_seq'), 69, null, 18, 6000),
		(nextval('yac_min_ym_codigo_seq'), 70, null, 1, 60000),

		--MONAGAS
		(nextval('yac_min_ym_codigo_seq'), 71, null, 15 , 6000),
		(nextval('yac_min_ym_codigo_seq'), 72, null, 1, 1000000),
		(nextval('yac_min_ym_codigo_seq'), 73, 7, null, 400000),
		(nextval('yac_min_ym_codigo_seq'), 74, null, 1, 900000),
		(nextval('yac_min_ym_codigo_seq'), 75, 7, null, 700500),

		--NUEVA ESPARTA
		(nextval('yac_min_ym_codigo_seq'), 76, null, 4 , 150000),
		(nextval('yac_min_ym_codigo_seq'), 77, 11, null, 70000),
		(nextval('yac_min_ym_codigo_seq'), 78, null, 4, 60000),
		(nextval('yac_min_ym_codigo_seq'), 79, 6,  null, 7000),
		(nextval('yac_min_ym_codigo_seq'), 80, 12, null, 80000000),

		--PORTUGUESA 
		(nextval('yac_min_ym_codigo_seq'), 81, null, 15 , 6000000),
		(nextval('yac_min_ym_codigo_seq'), 82, 5, null, 100000),
		(nextval('yac_min_ym_codigo_seq'), 83, null, 12, 4000),
		(nextval('yac_min_ym_codigo_seq'), 84, null, 3, 9000),
		(nextval('yac_min_ym_codigo_seq'), 85, null, 6, 70000),

		--SUCRE
		(nextval('yac_min_ym_codigo_seq'), 86, null, 16 , 800000),
		(nextval('yac_min_ym_codigo_seq'), 87, null, 5, 700000),
		(nextval('yac_min_ym_codigo_seq'), 88, null, 4, 60000),
		(nextval('yac_min_ym_codigo_seq'), 89, 12,  null, 7000),
		(nextval('yac_min_ym_codigo_seq'), 90, null, 1, 80000000),

		--TACHIRA
		(nextval('yac_min_ym_codigo_seq'), 91, null, 1 , 600000000),
		(nextval('yac_min_ym_codigo_seq'), 92, 2, null, 100000),
		(nextval('yac_min_ym_codigo_seq'), 93, null, 1, 40000000),
		(nextval('yac_min_ym_codigo_seq'), 94, null, 1, 9000000),
		(nextval('yac_min_ym_codigo_seq'), 95, null, 1, 7000000),

		--TRUJILLO
		(nextval('yac_min_ym_codigo_seq'), 96, 13, null , 60000),
		(nextval('yac_min_ym_codigo_seq'), 97, 2, null, 700000),
		(nextval('yac_min_ym_codigo_seq'), 98, 2, null, 200000),
		(nextval('yac_min_ym_codigo_seq'), 99, null,  5, 700500),
		(nextval('yac_min_ym_codigo_seq'), 100, null, 4, 1000),

		--VARGAS
		(nextval('yac_min_ym_codigo_seq'), 101, null, 3 , 600),
		(nextval('yac_min_ym_codigo_seq'), 102, null, 10 , 10000),
		(nextval('yac_min_ym_codigo_seq'), 103, null, 10 , 4000),
		(nextval('yac_min_ym_codigo_seq'), 104, null, 4 , 90000),
		(nextval('yac_min_ym_codigo_seq'), 105, null, 13 , 700),
		(nextval('yac_min_ym_codigo_seq'), 105, null, 5 , 1500),

		--YARACUY
		(nextval('yac_min_ym_codigo_seq'), 106, 2, null , 30000),
		(nextval('yac_min_ym_codigo_seq'), 106, 3, null , 6000),
		(nextval('yac_min_ym_codigo_seq'), 106, 4, null , 100000),
		(nextval('yac_min_ym_codigo_seq'), 107, null, 2, 7000),
		(nextval('yac_min_ym_codigo_seq'), 108, 2, null, 200000),
		(nextval('yac_min_ym_codigo_seq'), 109, 8,  null, 2000),
		(nextval('yac_min_ym_codigo_seq'), 110, null, 1, 100000),

		--ZULIA

		(nextval('yac_min_ym_codigo_seq'), 111, null, 6 , 6000),
		(nextval('yac_min_ym_codigo_seq'), 112, null, 20 , 1000),
		(nextval('yac_min_ym_codigo_seq'), 113, null, 1 , 400000),
		(nextval('yac_min_ym_codigo_seq'), 114, 10, null, 40000),
		(nextval('yac_min_ym_codigo_seq'), 115, null, 1 , 7000),

		--DISTRITO CAPITAL 
		(nextval('yac_min_ym_codigo_seq'), 116, null, 8, 60000),
		(nextval('yac_min_ym_codigo_seq'), 117, null, 1, 700000),
		(nextval('yac_min_ym_codigo_seq'), 118, null, 1, 200000),
		(nextval('yac_min_ym_codigo_seq'), 119, null, 3, 700500),
		(nextval('yac_min_ym_codigo_seq'), 120, null, 1, 1000);

INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('L7T 1X6',7),('O0G 8C9',8),('U1Y 2P9',3),('G8T 5V9',2),('K7O 2V4',3),('L6B 4R5',2),('E4I 0Q7',1),('Y2H 9N1',1),('A7Z 5J1',4),('A3V 4I7',7),('V3K 1V8',2),('V7Q 7K3',5),('K6J 3Z3',8),('N8C 6R2',1),('Z0X 8K3',1),('M3Z 8V7',3),('U5A 0I5',5),('K0F 2B6',6),('M6L 4I9',7),('B2B 5B1',8),('L9L 4Z4',2),('L2K 3X8',5),('I9Y 8Y6',5),('F4E 5H8',1),('J0E 0K7',1),('J9D 2V6',2),('L1G 2K4',1),('Y9P 2P9',5),('O5C 0T9',8),('K2L 1N7',5),('W0P 7M3',6),('K0G 4X4',4),('G2U 8S9',3),('B4O 3V0',8),('V5R 2W8',2),('M3E 5B1',5),('B4F 5Z7',1),('C3G 2S3',5),('W1I 7Q1',1),('Z2T 2K8',3),('J9X 0E8',5),('L2X 4Q8',4),('Q9I 0D9',3),('I9S 3N0',7),('M9L 6B9',3),('D5M 1Y3',3),('G8B 8I3',1),('Z4G 8N9',5),('N2B 0L6',4),('C5H 4Q0',4);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('U4G 2X4',2),('E2C 1B7',5),('R1V 7N1',1),('Z8X 6S8',6),('V7M 2H9',3),('Y6M 3L5',7),('A6L 1F1',7),('T8L 2G2',7),('J3C 2Z5',6),('O6D 2R0',2),('Q7K 2R7',4),('U8X 7C3',4),('U8T 7E6',7),('Q5M 3H8',8),('I5S 1M1',6),('R1G 5W8',5),('B7Z 5S7',3),('E7G 1O0',5),('T5U 2B5',3),('F8C 7Q0',3),('R3G 8X0',2),('K6Z 9U7',3),('W4B 5Y0',2),('V1E 1L0',2),('B6X 8N5',5),('D3O 4O3',5),('M6P 7J8',7),('J1Q 8I0',6),('D8Q 2N5',6),('E2H 2Y1',8),('R1H 8M2',3),('C2B 9H1',1),('S0P 0J5',1),('L0O 3D3',5),('P1T 9Z0',4),('J4H 4G0',4),('L3I 5E5',7),('W9W 7U7',7),('V3N 8P0',2),('J0A 8A6',5),('G9M 7O1',3),('E4W 2Q2',8),('X2G 0Y4',7),('Q5S 2R1',4),('B7L 0H1',3),('Z8E 0K9',5),('O1S 4W8',3),('C2Q 3U3',1),('M8T 0L6',8),('S4H 2F8',1);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('I4S 8M6',6),('L4C 1U1',1),('H9G 7L1',8),('J9M 7L0',6),('T4T 0F7',3),('T2Z 9R8',6),('C7H 7Z5',8),('Q0I 3N5',5),('T8Y 2N4',5),('F4T 7P2',7),('I9V 2N4',1),('P0E 1N1',6),('J1E 0O2',7),('Z7C 2V4',6),('Z4B 3M3',3),('P5B 7U6',6),('T8E 1K9',7),('S8Z 6C2',4),('X6B 8F5',2),('S1N 6I3',4),('A1X 8I9',2),('J0Y 1E9',3),('A7Q 8Z7',2),('F8E 6O6',4),('X0S 9O3',8),('N1S 7V9',1),('L3B 2C3',3),('M8E 9M9',3),('R1B 2D5',4),('D4G 0L2',4),('R6L 7L0',2),('L5G 9I1',1),('J4T 9V7',2),('A4N 9C9',6),('D2L 3W7',8),('I0J 4E8',4),('J1R 5H5',8),('Z1G 7K2',1),('G5A 7N8',6),('N7G 5D7',4),('E0T 9V1',2),('I7T 5X5',3),('M7M 7X3',4),('O2W 4X0',2),('Y0D 8A9',3),('C0B 7U6',7),('E3C 7Z8',6),('E6U 7H8',2),('I0T 2R1',8),('C8Z 0H2',1);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('K2W 5F2',5),('B5D 5M6',1),('Z1A 2W2',6),('F8Z 2Y0',7),('E4R 1T0',5),('U1F 6I2',1),('Z5K 9V3',7),('W7L 3R2',5),('J5S 8E6',7),('I4B 5K3',4),('J7W 0Y0',6),('Y8K 2K2',7),('M6R 4C5',4),('G5G 2J4',3),('Q5E 3H9',2),('D3Y 0C2',6),('X3D 2J8',7),('G8R 1S1',4),('V2H 5U3',7),('H6V 7V8',1),('M5I 7S0',1),('M8O 3Y7',6),('Z5Y 7V0',6),('V8T 9E3',6),('A7N 0P9',5),('O8D 1S3',5),('L3Q 5E4',4),('H1W 8C5',7),('Y3I 9U8',8),('I2S 4E7',1),('H7O 7D0',2),('E7B 0A6',3),('L0V 9F1',5),('A7E 6K6',4),('D7X 5P9',1),('F0Y 7M8',6),('H6V 1P1',1),('V0I 8V0',6),('E1R 9A8',8),('W3A 7L2',4),('K4V 1G8',4),('V6P 9N7',4),('G0Y 5T1',3),('Z1W 5A6',2),('T7K 2T7',4),('X3O 5N3',2),('E6Y 1H8',3),('H2M 0Z4',8),('Y5A 9Q2',4),('R5G 3L3',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('L9M 8V3',8),('O2L 2A0',3),('S7Y 6L2',2),('O8T 2T0',7),('M7G 0Z3',6),('X5B 7U8',3),('W7B 7Q2',1),('P3A 0L1',3),('S1L 3S2',6),('L8B 0A8',5),('T4K 5O7',6),('L7M 7I4',8),('I8F 2U0',5),('I9Z 9V0',3),('O3A 2H7',7),('Y8R 1O5',5),('E2Q 1J8',1),('B0P 3L0',1),('Q7P 9V0',4),('S4K 1K0',5),('S7B 9U8',7),('C2E 3N6',1),('X9W 0N7',5),('R4S 1F3',7),('U1G 4N1',5),('A8J 0I7',1),('N9Q 6M4',7),('V7L 3X2',7),('S4H 6M6',6),('P9R 9X9',8),('A8C 6H3',7),('Z2X 4C4',1),('L4D 8N2',1),('M0A 3E3',7),('X4I 3F2',3),('B4H 1P8',1),('R1U 3P1',7),('P6G 7D9',6),('F8F 5R7',1),('J8G 6Y4',5),('J7X 4R2',1),('A1J 5U9',4),('P7P 8G8',5),('U0X 7U7',1),('C1W 2Q3',4),('N7V 0O3',4),('F4N 1P0',1),('M8H 4L1',8),('I9H 7Z9',6),('O4J 1H8',7);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('A2J 7A5',7),('L8G 8C2',3),('R8G 2E7',1),('W6R 9X7',7),('R9B 8N2',5),('Z2C 7A4',4),('Q1I 5M4',1),('C4J 2F5',3),('D4J 0D8',5),('J1T 4L8',6),('N2M 3J5',1),('N1C 7A2',2),('M8D 7N5',7),('N1I 0X3',7),('D1Q 5K3',4),('L3W 4N2',1),('X2Z 6M2',5),('Q0B 3F6',7),('V9G 8V2',7),('G7U 9Y6',5),('F9Q 1J7',4),('X0D 3U7',8),('U1Y 3R1',8),('K8Z 4Q4',8),('A0D 1M5',4),('I1R 8D8',4),('H0Q 7O5',7),('X5X 9R6',6),('A3B 0C5',4),('J8M 6F1',3),('R7D 9O1',5),('W4S 4T2',6),('W4L 8O4',5),('G1A 7I9',5),('P1O 0U7',7),('E0S 2U1',8),('H7N 2A4',1),('J7I 1E8',7),('X0Y 5L9',1),('P6U 0U4',2),('Q3W 3W6',3),('X3A 7I1',7),('S6B 4O1',1),('E8D 2W5',2),('F4R 6U5',2),('R1C 2X8',6),('X1F 9B9',5),('W7V 2E5',6),('G8F 0V2',3),('J1E 4W8',1);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('K3Z 1L4',7),('P1Y 1W6',6),('Q0A 8B1',4),('X9O 1G1',7),('U0T 9J5',5),('P3L 3N8',6),('O5P 3O3',7),('C2N 1V1',7),('I8O 4U4',3),('B9X 3R2',1),('X5D 7I1',2),('S5S 9M7',3),('F3Z 3R3',4),('I2S 1X5',7),('J8X 1V7',1),('I1M 4A3',1),('W3B 0V3',3),('C9X 1S1',1),('B0D 3U0',4),('E4Z 5S0',6),('A5M 9M8',4),('I3W 7N9',2),('Y0Y 8V0',3),('U0R 5J2',7),('N2U 2G7',1),('Y1S 4V0',6),('H6F 8P6',1),('Q4N 6T1',1),('V5X 2T8',7),('E6T 6K7',8),('O5J 4T3',3),('E0P 5K2',3),('S8Y 2R3',3),('R7F 4Z3',2),('A2B 7J4',7),('L1W 2U1',5),('B7V 9U0',7),('U3X 1F9',1),('U6F 2B5',2),('S8U 3B5',5),('C1R 6O6',3),('Q4A 8D7',1),('U3Z 4F7',4),('G9E 0E2',4),('C7O 6E6',4),('C1D 6W6',8),('H8I 0J0',8),('W0A 0B6',4),('C9O 4L2',3),('P3Z 3A5',5);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('R7I 2K8',3),('T7Z 6X4',3),('U9P 6N2',1),('N2B 3F7',4),('E3S 3E6',8),('S9A 4G6',2),('I9W 6Z9',3),('J9S 9D6',2),('Y3I 7A3',3),('V7U 2B9',5),('U2D 7Z5',5),('V5P 2B9',3),('N9E 6S3',6),('J6R 0O4',1),('C3C 9F0',3),('C0V 9E6',6),('X0Z 4H5',8),('K5O 3X8',1),('L5U 3V2',4),('U7U 2J9',5),('C6J 5J3',3),('F7H 5H7',5),('N6B 3N8',2),('L7X 6M9',6),('J7M 5D1',7),('K1U 0Z5',5),('U8E 5Y8',5),('J2H 3Y4',7),('X3U 1M9',4),('C3K 4V0',3),('D6T 0U7',5),('C5J 7F0',8),('W1Q 2U3',4),('E6V 3V7',5),('G4D 1F7',5),('B2V 1P0',4),('Y4G 9D9',7),('R4A 8Z9',7),('A5A 2X8',8),('K7M 5A4',6),('Q8M 4L7',8),('O0K 4E4',2),('I2X 9P3',8),('N2F 6U0',6),('Y9F 4P4',6),('R6N 8J4',7),('D6D 0D8',2),('K6H 5C3',6),('C5K 8Q0',8),('D3P 1J8',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('P7A 0Q5',1),('W0C 9E5',7),('T5F 9C4',3),('N1E 4G6',7),('E5K 7V5',8),('G2T 0C7',1),('B0Z 1R3',4),('P1K 0X1',5),('D7K 1K0',4),('B8B 0W8',6),('R2D 2R0',2),('Z4I 7I4',3),('K1Y 3K0',1),('I8O 8O8',3),('U4F 2P7',6),('Q2Y 2B7',1),('C4U 0C2',1),('T9J 5E2',4),('U6B 2A4',6),('R7H 1H5',7),('J8F 5D2',8),('R0B 4P9',3),('H5P 0K4',5),('T9B 5Q4',8),('J6Z 6B4',5),('A3N 0L5',5),('X1B 1W6',2),('B5E 9O6',7),('J3E 9W0',2),('L4P 3I5',7),('G7N 5V3',5),('K4U 9U4',3),('W7W 4Y9',2),('J2K 7H3',1),('C2P 5J2',4),('P4R 9V8',8),('T7R 5H5',7),('N3Y 4Z2',8),('X0Y 6I8',4),('S2Y 4X3',3),('C7O 5M9',5),('T2R 6Y9',5),('Y2O 5J3',3),('O5K 9F0',3),('U3I 5K0',8),('W0A 2W6',2),('G6Y 8B8',3),('K4E 8V6',6),('J2N 3Q0',4),('L9K 3K2',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('U0S 0R5',4),('Q5A 0V9',3),('W7E 4C3',7),('Q1L 2U5',6),('J2B 5P2',3),('B6R 3Q2',8),('U8E 4F1',1),('H7R 4B4',4),('W0J 7B5',3),('Q0R 4I7',6),('X6X 6B7',4),('W7G 0Q7',4),('O2W 9F9',8),('M8T 5X3',5),('R0Y 0K6',8),('Q5Z 7I4',4),('N6J 9A5',4),('A6X 3T7',3),('G0N 2A0',7),('E9U 9U0',4),('V5G 5S2',3),('X3R 4M1',3),('T2T 7B9',7),('O6P 3I2',4),('W9A 0V2',8),('M5I 4R0',2),('T3A 5I6',4),('W4X 6L4',2),('Z7V 7J6',5),('W2K 5A8',2),('V7J 1Q0',2),('W8I 6E8',3),('L8F 5V6',6),('V3Z 2H2',4),('M5K 2Y1',7),('C2V 5K0',4),('N3M 8L4',7),('W4S 6V5',1),('E5H 4H5',4),('Z4M 0I5',6),('L7O 0F3',8),('L2M 2G2',4),('Q1Z 1J1',8),('L1T 3E3',3),('Y3X 8P2',4),('Z6V 6U7',6),('U9K 0N6',2),('Z2Y 1R4',3),('R9J 2W7',3),('H3V 1F8',5);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('T4I 8Y4',2),('Q1Z 7O4',4),('G5Q 9Q6',1),('H2N 0A6',5),('K6C 5O7',1),('Y7N 4Y3',7),('H8Z 3F0',6),('A7E 9C5',1),('B8U 9Z5',8),('C6N 5Z8',7),('Y2B 0Z8',8),('N2U 0K1',8),('D9G 6W5',4),('T5X 4C7',2),('J0X 5R7',1),('W2Y 1Y4',5),('Y6C 6W9',8),('Q2P 3D4',1),('O1Q 1B7',2),('L9R 5L4',2),('N6O 4K9',8),('X1G 3A9',4),('J6S 1X3',6),('R1Y 7J0',5),('D6U 3C4',6),('L7N 4U2',7),('P2T 0F8',3),('E3W 9P5',8),('V6Y 0A1',5),('A5X 4A1',2),('O1T 1R6',7),('N3H 3M6',4),('W1J 5D3',1),('O7Y 8A1',5),('I4V 7K3',1),('H6Z 7T4',7),('Y0U 6E4',8),('S2W 4V3',6),('U9C 2Y5',8),('E6E 1R1',4),('P2V 8O6',3),('X3K 1V1',2),('P6F 8P3',1),('F7U 0W0',5),('O0E 7Q4',2),('P2I 4K7',8),('U1V 6N3',4),('V9M 7E7',7),('M4Z 7Y4',5),('R3E 6K3',5);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('N0O 1W1',3),('Q8U 9T2',1),('Y8Y 3C5',8),('U4N 1J6',4),('G2A 9K9',1),('R2J 7W4',1),('E2Z 3F6',4),('M8C 8W1',8),('J1Y 2E8',2),('V8K 8V7',8),('E2S 5R6',6),('C6S 8K3',3),('P6Y 4O9',1),('N4G 0N3',8),('S2A 4C1',6),('Q8F 5Q8',3),('A3U 6Y0',1),('K2F 6F8',7),('R5E 6T3',6),('O3I 8R2',3),('F5V 5W8',2),('G9Z 2J9',8),('L6E 3U8',8),('E4V 0U9',3),('W1U 6G6',2),('X4M 0K5',1),('J4M 7H7',2),('J4S 6C7',8),('W9G 2J1',5),('P8U 9A3',7),('H8C 9L4',8),('C6L 1N1',2),('X7F 5T1',1),('A0H 7P5',4),('Y2V 6C7',2),('S5M 4K0',4),('T7M 9Y8',7),('L2X 3R3',2),('P4Q 6F3',7),('H7A 2D8',3),('K6G 2X4',8),('F4K 4U1',1),('K5W 0G7',5),('T1I 3Z6',3),('T2I 8V5',1),('Q2D 5H1',3),('W0L 9U0',7),('M0O 9H2',4),('U6A 7A2',3),('N4N 5X7',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('G4N 4J6',6),('F9P 6X4',8),('C0M 8G8',2),('C8C 7G9',4),('P6J 1C0',2),('T6N 4H0',3),('U8H 2E0',6),('P5V 0R3',3),('Y4N 5U7',4),('P4Y 8Z0',6),('S3J 8W6',8),('C4J 0X8',5),('V7N 0R8',7),('X2E 2B6',6),('I0J 3H2',2),('B6L 6J6',5),('S4F 6O7',4),('Q5E 7W3',5),('I5K 1Z5',6),('P3M 3L5',8),('P3L 2B9',2),('N4Y 3B7',1),('T0M 6X1',4),('M1V 0S9',7),('I3K 8C3',8),('L3I 2L8',7),('Q4U 2S1',5),('K0K 0T7',1),('Y5L 5W5',7),('W1W 8J2',4),('I0C 4O4',7),('T8B 5L3',3),('W1B 3O0',5),('S5K 3D6',4),('M5L 0V6',1),('N1Z 1F1',2),('Z0A 9M8',4),('B2I 1M5',3),('D6R 0X4',8),('R9T 3X9',2),('K0C 7Q9',2),('S9J 1J9',3),('H0E 4X1',7),('K4E 5N1',7),('Q9N 2E9',4),('V8J 8Q9',4),('X9Y 8T2',6),('F4L 9K7',6),('U5M 7W8',2),('A7H 8O7',3);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('Y8N 1P4',8),('L4B 2K6',6),('O2G 6S9',4),('J1U 0L4',4),('C9E 0V8',6),('L6R 7Z8',6),('R2G 1L1',4),('I9W 2M9',1),('C5S 2Y1',4),('V6W 9F8',3),('N4I 1Y1',8),('W3I 9P6',3),('M0X 2J0',4),('I8Z 7L0',1),('C5G 2P2',4),('T6K 5Y5',5),('T1K 7N4',3),('G3R 0B8',1),('G5P 7M9',3),('Q6M 9P5',1),('W0A 4O5',6),('P5G 4W8',1),('U0Z 4M1',4),('B4C 1G5',7),('V0A 0P4',8),('U4H 8J3',5),('E5X 1R3',5),('K1D 3N9',6),('B3X 0H8',6),('F8W 2O8',7),('H5E 1R5',1),('O6R 3S0',2),('F5C 8I7',8),('E4G 7L7',2),('T9S 6P2',1),('I6T 0S1',6),('T3S 7L6',1),('H8P 2A3',1),('L0F 4Y9',2),('T7D 2R7',8),('J9G 5Q5',6),('M5C 4F3',2),('C6L 0P3',4),('J8H 6O9',6),('M2Y 2T8',6),('X1C 5T4',8),('B4Y 3X1',2),('H2S 9A4',8),('C3Y 7N8',4),('C4P 8B4',8);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('M0Y 9P8',3),('K5Y 2G5',4),('O1F 9W5',1),('F4B 5Y4',7),('G5F 5O3',5),('X0N 7V2',6),('N5U 0F4',5),('M8B 0I5',7),('E0A 0H2',2),('N0Q 4G7',4),('M5K 2E4',5),('T8U 8O0',1),('P6X 4B4',6),('Z8Q 6N0',4),('F6F 0Y2',8),('X8M 6P2',4),('G3Y 7R2',2),('N5L 8G4',8),('Q4I 2B8',5),('C0I 1I3',4),('B1J 0B9',7),('K6P 2S3',8),('K7E 2D2',4),('I8P 1Z5',3),('E0K 2O7',7),('Y2E 1F2',1),('Z8N 4V6',8),('I7Z 0Z7',2),('N6K 1D5',3),('Y0C 1A0',6),('Z2Q 7D8',8),('C4O 6F0',4),('Q4S 1X2',7),('Z9O 6D7',6),('Q5Z 2U3',4),('H3H 0B8',5),('L0I 6K9',5),('R0Q 7W4',1),('U4E 9I1',6),('G8H 1B2',5),('W9Z 6S2',8),('E4N 4H6',7),('Q8D 3V2',4),('R1M 2I3',2),('P4E 8P3',6),('O9S 6N7',1),('Y3C 9M2',3),('M1V 7B8',8),('C7N 6S8',4),('P5A 1V1',5);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('X2M 5F3',6),('C5O 0K1',3),('W0G 6T5',3),('K5R 2S5',7),('L7K 8G7',5),('C4R 1U1',4),('S2E 0G2',7),('E3J 9F4',3),('B4P 9I0',3),('O2J 8J4',8),('Z6E 8M2',4),('V6F 9K7',6),('E7F 1G1',8),('K2F 2W2',4),('Z1B 2T8',1),('K2S 0E6',1),('L4A 1B1',8),('N3J 6K1',4),('J1K 3B2',7),('J5R 2L5',2),('A1H 2U6',3),('R8T 5R5',2),('J3W 3M7',4),('Z4Y 0W2',8),('C5W 0J7',6),('W2T 6L4',4),('R0A 8V6',3),('K5N 4M9',8),('G3D 5X6',4),('E8Y 2T9',7),('F2M 4D5',3),('I7X 3V5',1),('S5Z 8G9',7),('J8M 3E1',5),('O7D 5A9',7),('A5R 1A3',8),('G7F 5G4',6),('A2U 2K0',3),('M7R 8Q4',4),('R7H 4N5',1),('V1H 7D9',1),('I2W 7N8',3),('N6O 6S8',7),('K4H 3U5',6),('L4O 5D3',4),('L6V 7B8',5),('J3V 6R0',5),('S6M 9O8',6),('G2J 2J7',6),('F2H 4W0',4);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('T6Y 3I4',3),('A1E 9O3',7),('K7C 5T6',8),('A4S 1Z5',1),('V6T 0G4',2),('O0N 3Z2',5),('T3Y 5X7',4),('L6Y 7T8',7),('I1H 3T5',6),('B2K 4Y6',4),('Q8A 5A2',5),('J2K 1H0',5),('G9W 0U0',6),('P6P 6N9',6),('S2R 0Z7',4),('A7K 1B8',6),('L9M 3L0',8),('R8C 7S6',7),('K0F 4Y4',7),('S6R 4A9',8),('H6H 6Q5',2),('K0W 5F4',1),('W6A 0P8',4),('F8V 7Y4',2),('Y0A 4X6',1),('L0T 7T9',7),('J9S 3V9',7),('P1F 0P9',5),('N6S 6X0',3),('W4A 4F7',4),('P0V 3J0',5),('C9N 3W7',6),('X4W 6R4',6),('T3C 9W4',4),('V7R 6W7',1),('P2X 2J8',8),('G5C 7T6',7),('P7E 1F5',2),('D2D 5P5',3),('H6F 9W6',7),('F8R 3G5',8),('O6I 9M9',4),('U2L 2H0',1),('P1T 6H9',4),('S8B 0S8',1),('K6K 8K6',4),('S8R 2Q0',4),('A3E 0H5',3),('V5A 4Q2',8),('X6X 3D2',3);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('W0J 6Q9',6),('O1R 8K5',3),('Y8F 2D6',2),('V6G 4F6',5),('X7Q 6Q3',7),('C1D 9M3',2),('A2E 2Y9',5),('N4Y 6R8',7),('R5V 6R9',1),('X4T 4L5',6),('E7G 6F6',4),('R2U 4N7',8),('K7F 5Z9',5),('S2I 7M1',1),('E9O 8T3',4),('Z9J 1D8',3),('T2Z 5D1',1),('E3D 1Z6',4),('D7O 3Q3',1),('A1J 5G4',8),('F9T 5K0',5),('R7R 2L2',2),('J3X 8W7',8),('V1P 5R9',8),('E0C 0F6',4),('A7M 4Q9',6),('Z1O 9B9',6),('E5I 0W8',1),('Y3Z 5B9',8),('I1U 1D8',8),('T4P 3Q7',8),('J5S 9W8',5),('B9A 9L9',8),('M0C 2I8',1),('P3Z 2H8',8),('G5K 0C0',5),('E8K 7B7',2),('F0B 8D2',1),('U4C 6T1',4),('N8F 5R3',3),('H3C 4W2',5),('P7T 2W6',3),('Y5T 3E7',8),('R8N 2N5',3),('X2M 0D3',8),('I6Q 4U0',7),('W3A 2R2',5),('B9Q 5J0',7),('S2R 2X2',7),('L8N 1G2',5);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('K3I 5R4',5),('C8V 4S6',3),('U7D 6D7',2),('E8Z 1V4',4),('U0F 4K6',7),('W6Z 8F3',3),('P6Q 6G1',3),('V0N 2S0',3),('F1C 0T9',2),('R3Y 8L5',2),('C0R 0A3',4),('Y3U 4B4',4),('M7J 0S0',3),('Y0V 3T5',4),('T4J 7W8',5),('J2K 7G6',4),('U3S 3Z6',8),('X1E 1A0',8),('O6C 3H4',2),('Y7L 0I5',2),('T4N 9S0',1),('N5W 9T4',3),('B2I 5V4',6),('W7J 4X8',5),('W3B 9S9',7),('Q5H 5K1',2),('J4Z 6O6',8),('F6V 9G0',4),('G1P 7X1',7),('P3G 6T3',1),('C8Z 0Q6',6),('D3N 3M1',4),('U2R 0X3',7),('D8B 4A8',4),('B1P 9I0',1),('M9C 7Q9',2),('I5F 1P4',4),('K4F 8I3',2),('V6T 7S1',2),('Q9I 3P6',8),('Y4P 0P3',5),('T4I 6R2',2),('X7C 3Z0',2),('T6F 6S3',7),('I7B 0C8',7),('C2A 2H5',8),('C3L 1M6',4),('M9S 3O5',1),('O7N 0V4',2),('R8J 8I1',7);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('S8Q 7J4',3),('V5M 2Y2',4),('L7P 1Y4',5),('C3W 1E3',4),('H6F 8O5',2),('T7I 6D4',1),('U1N 8P0',2),('N2U 5P7',1),('V7R 5U8',3),('Q4N 9Y7',2),('H3Y 7P9',2),('V8W 1X0',3),('V0P 4J9',1),('V8J 1A5',8),('D0F 1U2',7),('Y3Z 6Z4',6),('P9J 6W2',5),('O4O 1H2',2),('Z9I 5A0',7),('E0Y 1J5',5),('E2Q 6Z3',4),('V4D 5Z0',5),('N3D 5Z6',7),('F5F 6A2',6),('L1E 9F7',3),('E6F 8B3',7),('M9M 4B2',1),('T1Y 2N7',7),('Z6L 9N9',2),('L5E 5L6',5),('E7I 8R3',5),('L0B 2R3',1),('M1J 8X6',8),('U5E 3A2',3),('T8H 1C8',3),('U2U 8F4',2),('H0D 3Y1',3),('S6Y 4X4',8),('M9R 9E8',8),('U8N 9A0',3),('M3Z 5W4',7),('V2C 3F8',2),('D9Y 2T1',2),('K7D 1T7',4),('A6F 0H6',5),('Q0J 4Y5',6),('E7S 7C3',1),('J1D 9R4',5),('E5P 3O3',3),('A3S 5L4',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('B2A 6F7',7),('Q3I 8W9',7),('V0M 6X9',7),('X7G 6W8',2),('E8J 9G4',3),('R5R 7F7',8),('H8S 1F6',3),('F3I 3F6',1),('X7D 4R5',8),('P2G 8M5',1),('N3J 4V2',1),('P1S 6S6',5),('Q9W 9G4',3),('Q7U 1V4',5),('C2J 6N8',8),('G9E 5Q9',8),('T5I 3V3',2),('T3F 5G7',7),('E0T 8Q8',6),('C2M 6U1',1),('I9W 5U0',2),('C6J 4I2',2),('G0I 2N0',8),('Q7G 4Y8',5),('F0R 7F3',2),('Y3J 7J5',5),('E6R 3Q5',2),('I5G 1A6',2),('A5H 3U1',4),('M7L 9O1',6),('F1D 2F7',4),('W9U 6F7',7),('M9U 1H2',5),('U8V 6R5',4),('Q0Z 8K9',1),('X2L 6A8',6),('L3B 6I6',5),('K0P 4R8',5),('J3P 8J0',4),('Y5D 8W9',7),('L3R 1Y5',3),('M2L 8L5',6),('Q1Z 7L9',6),('X2Q 1M9',2),('K9L 8L2',6),('H7M 3G4',2),('R1F 6R0',6),('X0U 1B7',6),('V2F 4N3',3),('X1B 0B4',6);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('V9W 8X3',3),('O3F 4Q4',4),('Z6N 0Q6',6),('C7U 5A4',8),('X7A 5H5',4),('S0D 6U1',1),('L8W 0Y4',8),('N4O 4T0',2),('Q5H 7J9',4),('Z5F 5Z3',4),('Z1G 6G0',6),('X6R 9Z3',8),('X4H 7N6',6),('H1E 3H5',8),('Z5U 9C5',7),('B7V 3C7',6),('Q0L 3O2',4),('M2Z 0Y5',5),('C1N 9D2',7),('P9C 9P0',3),('O3C 1R3',8),('P7Y 3B9',5),('S2W 4F6',8),('L9P 7U2',7),('R8K 6A9',5),('H8Y 0M9',2),('Y2J 7R1',1),('X1C 8V8',1),('K4I 7S6',2),('S1S 7W9',2),('P0C 7A6',1),('W5I 4N0',7),('E3N 3L7',2),('F3G 7Z3',6),('X4O 3Q9',8),('Q2S 0C8',2),('K3M 8Y4',2),('O1R 1H4',3),('I6J 9P5',1),('H4P 1X2',3),('L8V 9V1',6),('M2Y 2T0',2),('P5E 9S9',1),('J5H 8V2',5),('B7C 9K3',1),('Y3N 4B1',6),('X2J 2V3',8),('S9T 9Y1',2),('W1L 1C8',7),('J1O 9V8',7);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('B6M 6U1',1),('B4X 6R5',4),('X8Y 8L5',5),('Z5E 8M4',8),('U4K 9I5',3),('A4F 7Z9',6),('Z0Q 4C7',3),('W8K 5N2',1),('N9Z 7N0',8),('S2F 5T0',1),('Q8Q 6K7',6),('S9G 4A2',6),('A1Z 5V0',5),('X5O 0G5',2),('U5G 8Y3',3),('F0D 0Q4',5),('C1X 8Q5',6),('O6R 9K0',1),('I6S 8A0',1),('X1S 8W0',7),('C8U 7W8',8),('Z8J 8M2',6),('Z8V 7R5',8),('B7E 5R5',6),('V5W 2S8',8),('E1V 6F0',8),('O5A 5Z4',4),('R2D 2H1',8),('B7I 6M1',4),('L1T 6P2',7),('N1O 7R0',1),('R5K 7H3',3),('F8I 3Y3',7),('G6M 4V3',3),('D0F 4V1',2),('A7O 6Q1',1),('K6E 7B1',7),('S3E 0U1',4),('F1I 1W7',2),('V9I 5H3',5),('Y4P 0P8',7),('N2Z 4K1',2),('B2W 6P7',5),('B0Y 7X9',1),('P1I 4F8',8),('M6E 4X8',1),('F2K 9Z8',6),('C9V 4J1',5),('D1O 1Z9',7),('Y1E 2U7',1);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('A2S 3Y4',4),('F9E 2T7',7),('G3B 3J0',1),('C3K 0P0',4),('Q0U 6H8',5),('S4P 7M9',6),('V3K 8R6',7),('D8F 4A2',1),('C4P 3P3',3),('G6Y 4V8',6),('J6J 9B3',7),('M8Q 8X4',8),('N2Z 4R7',2),('T3X 0J0',1),('M3T 0M8',8),('G1Y 0J2',5),('N3O 4L1',4),('W3F 8I3',8),('C3C 6I8',8),('N1A 6R9',1),('D4C 4Q8',2),('F1W 1N9',4),('I8R 1B7',6),('K4F 0B5',8),('S3Q 4K5',6),('E3N 9P3',3),('Y4E 5M4',7),('U4Y 8E6',6),('X5D 1P9',8),('J5X 5N6',5),('I5J 3M9',7),('N3P 2X2',2),('L1O 6N4',4),('T6N 9U7',6),('R9T 5O3',8),('S1K 0K2',3),('M8R 2B3',1),('N5O 3W6',2),('Y7A 7P6',2),('Z4R 6Q1',8),('X1O 5T9',7),('X8L 1U9',4),('X6C 8N3',2),('Y3M 4N2',7),('E3P 1R7',3),('S4D 3A6',6),('V1E 8Y6',7),('X1H 8S9',8),('I3A 0W3',7),('E6D 7D2',2);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('Q5H 4J5',4),('R5H 6R7',2),('X4Q 5G7',8),('I7E 9B6',4),('U9H 8Q8',6),('Z3S 6S9',7),('P5Q 6K2',8),('T8A 9Z7',7),('G4X 6D6',6),('G3V 3T1',5),('O9Y 7C4',4),('R4P 0E6',6),('L7A 8X6',5),('U1D 9H4',5),('O7I 8H9',1),('N7T 0A9',4),('M7K 3L9',1),('X4N 9O2',3),('N0N 2K3',1),('K4U 8H9',3),('D4X 2A1',3),('M5W 9R1',7),('J6Z 1W4',8),('K9E 0A8',8),('Z7A 4N3',7),('W5Y 1Z7',7),('N2N 0V0',6),('E4W 2Y5',3),('I4D 5N5',7),('P5V 4R9',7),('L3N 7O4',1),('Z3H 2T4',4),('K4S 3F9',1),('F4O 2C0',1),('G2G 5G2',4),('I1J 6A0',1),('R3J 5R9',3),('Z4F 3D4',2),('M5B 6O8',3),('T8H 3H6',3),('W2Q 3J2',7),('T9R 7P8',7),('H4M 6W4',7),('H0E 4L1',8),('R5D 0S5',5),('M4Y 2U5',7),('K8T 1G8',3),('N6K 9Y5',7),('U7K 3Z3',3),('D3I 3Q4',6);
INSERT INTO MAQUINARIA (maq_nombre,fk_maq_tipo) VALUES ('E0J 9G3',6),('R6Y 8Q4',8),('B1O 0S9',6),('A0H 5Z0',2),('V2P 8Q0',8),('M6V 3V0',3),('P2H 8U0',1),('R8V 4U6',8),('D2S 0W6',8),('U2W 0P3',5),('U8Z 2P6',2),('R5F 1T3',1),('E8D 9B1',6),('J4D 2W7',5),('L7G 8K7',3),('I5H 9N3',1),('S6O 3Q6',5),('S0P 5Q8',6),('C3Q 3G8',1),('S6O 3I5',2),('B5L 6J8',3),('A5Q 7Q9',2),('G9J 8K7',8),('R6I 7B7',5),('Q3F 6X6',8),('N1B 0Y7',5),('F7I 3S4',2),('D7B 2T4',5),('Z6T 3P0',5),('Y2R 3M3',8),('A9B 9M5',3),('O3P 9I1',1),('V1C 5D3',4),('Y4I 5G7',6),('C9U 1Z4',6),('S9F 7E3',2),('R6T 0C4',5),('N5X 0B0',1),('G3C 7R6',1),('R6G 4Y4',3),('A6X 4H8',5),('B9U 7A6',6),('K9J 2Q9',7),('I7Z 9A0',3),('Z3K 9E2',3),('Z8I 1H0',6),('T3S 1L7',7),('F4K 3I3',4),('U7J 0S9',8),('L9Q 8W0',1);


INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_metalico) VALUES (168,4,3),(196,5,6),(190,8,13),(82,7,7),(199,1,9),(78,9,11),(63,8,8),(95,2,1),(101,8,9),(58,3,3);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_metalico) VALUES (166,9,3),(104,9,5),(159,8,5),(52,5,10),(90,6,4),(57,4,13),(65,5,2),(162,7,13),(185,2,6),(150,7,4);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_nometalico) VALUES (75,2,5),(176,3,7),(167,2,20),(72,4,8),(79,7,18),(110,4,16),(74,1,10),(81,9,1),(126,3,20),(54,2,3);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_nometalico) VALUES (98,9,7),(88,5,3),(198,6,14),(55,4,7),(105,6,6),(144,1,6),(108,4,19);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_nometalico) VALUES (71,5,16),(116,9,17),(101,9,18),(60,9,15),(110,9,14),(176,4,10),(77,8,2);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_nometalico) VALUES (176,1,4),(56,9,21),(78,2,9),(51,8,4),(188,4,5),(119,9,11),(119,4,12),(151,4,14);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_nometalico) VALUES (135,2,13),(55,5,12);
INSERT INTO MIN_PRE (mp_precio,fk_mp_presentacion,fk_mp_metalico) VALUES (151,8,13);

INSERT INTO VENTA(
ven_fecha, ven_montototal, fk_ven_cliente, fk_ven_usuario)
VALUES 
('2017-05-11',	16800	,3	, 4),('2017-06-23',	11790	,12	, 1),('2017-05-10',	2850	,8	, 1),('2019-01-17',	2050	,12	, 2),
('2018-11-17',	4179	,7	, 3),('2017-02-14',	5070	,12	, 3),('2017-06-06',	15750	,9	, 2),('2019-01-27',	950	    ,4	, 1),
('2018-07-25',	1111	,1	, 5),('2018-11-19',	522	    ,1	, 1),('2017-01-27',	19920	,10	, 4),('2017-03-10',	9880	,8	, 3),
('2017-02-14',	7950	,8	, 4),('2019-11-19',	572	    ,1	, 3),('2018-11-28',	3600	,5	, 5),('2028-04-13',	342	    ,3	, 5),
('2018-11-03',	4680	,11	, 3),('2018-11-04',	1620	,4	, 4),('2018-11-22',	18500	,9	, 4),('2019-02-15',	69000	,6	, 3),
('2017-11-08',	6150	,8	, 5),('2017-11-30',	10736	,11	, 3),('2017-10-19',	2004	,5	, 2),('2026-05-22',	1800	,10	, 1),
('2016-12-30',	32469	,3	, 2),('2017-07-25',	7150	,6	, 4),('2017-08-29',	3330	,4	, 5),('2016-04-13',	11340	,3	, 4),
('2016-08-19',	18900	,4	, 3),('2017-07-13',	216	    ,2	, 3),('2017-03-07',	3430	,1	, 2),('2017-12-25',	880	    ,4	, 1),
('2018-12-30',	3168	,2	, 4),('2018-12-19',	5610	,7	, 1),('2018-04-29',	10500	,1	, 3);


INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('I: Inventario de informacion',1,'1'),('I: Inventario de informacion',2,'1'),('I: Inventario de informacion',3,'1'),('I: Inventario de informacion',4,'1'),('I: Inventario de informacion',5,'1'),('I: Inventario de informacion',6,'1'),('I: Inventario de informacion',7,'1'),('I: Inventario de informacion',8,'1'),('I: Inventario de informacion',9,'1'),('I: Inventario de informacion',10,'1'),('I: Inventario de informacion',11,'1'),('I: Inventario de informacion',12,'1'),('I: Inventario de informacion',13,'1'),('I: Inventario de informacion',14,'1'),('I: Inventario de informacion',15,'1'),('I: Inventario de informacion',16,'1'),('I: Inventario de informacion',17,'1'),('I: Inventario de informacion',18,'1'),('I: Inventario de informacion',19,'1'),('I: Inventario de informacion',20,'1'),('I: Inventario de informacion',21,'1'),('I: Inventario de informacion',22,'1'),('I: Inventario de informacion',23,'1'),('I: Inventario de informacion',24,'1'),('I: Inventario de informacion',25,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('I: Inventario de informacion',26,'1'),('I: Inventario de informacion',27,'1'),('I: Inventario de informacion',28,'1'),('I: Inventario de informacion',29,'1'),('I: Inventario de informacion',30,'1'),('I: Inventario de informacion',31,'1'),('I: Inventario de informacion',32,'1'),('I: Inventario de informacion',33,'1'),('I: Inventario de informacion',34,'1'),('I: Inventario de informacion',35,'1'),('I: Inventario de informacion',36,'1'),('I: Inventario de informacion',37,'1'),('I: Inventario de informacion',38,'1'),('I: Inventario de informacion',39,'1'),('I: Inventario de informacion',40,'1'),('I: Inventario de informacion',41,'1'),('I: Inventario de informacion',42,'1'),('I: Inventario de informacion',43,'1'),('I: Inventario de informacion',44,'1'),('I: Inventario de informacion',45,'1'),('I: Inventario de informacion',46,'1'),('I: Inventario de informacion',47,'1'),('I: Inventario de informacion',48,'1'),('I: Inventario de informacion',49,'1'),('I: Inventario de informacion',50,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('I: Inventario de informacion',51,'1'),('I: Inventario de informacion',52,'1'),('I: Inventario de informacion',53,'1'),('I: Inventario de informacion',54,'1'),('I: Inventario de informacion',55,'1'),('I: Inventario de informacion',56,'1'),('I: Inventario de informacion',57,'1'),('I: Inventario de informacion',58,'1'),('I: Inventario de informacion',59,'1'),('I: Inventario de informacion',60,'1'),('I: Inventario de informacion',61,'1'),('I: Inventario de informacion',62,'1'),('I: Inventario de informacion',63,'1'),('I: Inventario de informacion',64,'1'),('I: Inventario de informacion',65,'1'),('I: Inventario de informacion',66,'1'),('I: Inventario de informacion',67,'1'),('I: Inventario de informacion',68,'1'),('I: Inventario de informacion',69,'1'),('I: Inventario de informacion',70,'1'),('I: Inventario de informacion',71,'1'),('I: Inventario de informacion',72,'1'),('I: Inventario de informacion',73,'1'),('I: Inventario de informacion',74,'1'),('I: Inventario de informacion',75,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('I: Inventario de informacion',76,'1'),('I: Inventario de informacion',77,'1'),('I: Inventario de informacion',78,'1'),('I: Inventario de informacion',79,'1'),('I: Inventario de informacion',80,'1'),('I: Inventario de informacion',81,'1'),('I: Inventario de informacion',82,'1'),('I: Inventario de informacion',83,'1'),('I: Inventario de informacion',84,'1'),('I: Inventario de informacion',85,'1'),('I: Inventario de informacion',86,'1'),('I: Inventario de informacion',87,'1'),('I: Inventario de informacion',88,'1'),('I: Inventario de informacion',89,'1'),('I: Inventario de informacion',90,'1'),('I: Inventario de informacion',91,'1'),('I: Inventario de informacion',92,'1'),('I: Inventario de informacion',93,'1'),('I: Inventario de informacion',94,'1'),('I: Inventario de informacion',95,'1'),('I: Inventario de informacion',96,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('II: Geologia de superficie',1,'1'),('II: Geologia de superficie',2,'1'),('II: Geologia de superficie',3,'1'),('II: Geologia de superficie',4,'1'),('II: Geologia de superficie',5,'1'),('II: Geologia de superficie',6,'1'),('II: Geologia de superficie',7,'1'),('II: Geologia de superficie',8,'1'),('II: Geologia de superficie',9,'1'),('II: Geologia de superficie',10,'1'),('II: Geologia de superficie',11,'1'),('II: Geologia de superficie',12,'1'),('II: Geologia de superficie',13,'1'),('II: Geologia de superficie',14,'1'),('II: Geologia de superficie',15,'1'),('II: Geologia de superficie',16,'1'),('II: Geologia de superficie',17,'1'),('II: Geologia de superficie',18,'1'),('II: Geologia de superficie',19,'1'),('II: Geologia de superficie',20,'1'),('II: Geologia de superficie',21,'1'),('II: Geologia de superficie',22,'1'),('II: Geologia de superficie',23,'1'),('II: Geologia de superficie',24,'1'),('II: Geologia de superficie',25,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('II: Geologia de superficie',26,'1'),('II: Geologia de superficie',27,'1'),('II: Geologia de superficie',28,'1'),('II: Geologia de superficie',29,'1'),('II: Geologia de superficie',30,'1'),('II: Geologia de superficie',31,'1'),('II: Geologia de superficie',32,'1'),('II: Geologia de superficie',33,'1'),('II: Geologia de superficie',34,'1'),('II: Geologia de superficie',35,'1'),('II: Geologia de superficie',36,'1'),('II: Geologia de superficie',37,'1'),('II: Geologia de superficie',38,'1'),('II: Geologia de superficie',39,'1'),('II: Geologia de superficie',40,'1'),('II: Geologia de superficie',41,'1'),('II: Geologia de superficie',42,'1'),('II: Geologia de superficie',43,'1'),('II: Geologia de superficie',44,'1'),('II: Geologia de superficie',45,'1'),('II: Geologia de superficie',46,'1'),('II: Geologia de superficie',47,'1'),('II: Geologia de superficie',48,'1'),('II: Geologia de superficie',49,'1'),('II: Geologia de superficie',50,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('II: Geologia de superficie',51,'1'),('II: Geologia de superficie',52,'1'),('II: Geologia de superficie',53,'1'),('II: Geologia de superficie',54,'1'),('II: Geologia de superficie',55,'1'),('II: Geologia de superficie',56,'1'),('II: Geologia de superficie',57,'1'),('II: Geologia de superficie',58,'1'),('II: Geologia de superficie',59,'1'),('II: Geologia de superficie',60,'1'),('II: Geologia de superficie',61,'1'),('II: Geologia de superficie',62,'1'),('II: Geologia de superficie',63,'1'),('II: Geologia de superficie',64,'1'),('II: Geologia de superficie',65,'1'),('II: Geologia de superficie',66,'1'),('II: Geologia de superficie',67,'1'),('II: Geologia de superficie',68,'1'),('II: Geologia de superficie',69,'1'),('II: Geologia de superficie',70,'1'),('II: Geologia de superficie',71,'1'),('II: Geologia de superficie',72,'1'),('II: Geologia de superficie',73,'1'),('II: Geologia de superficie',74,'1'),('II: Geologia de superficie',75,'1');
INSERT INTO ETAPA (eta_nombre,fk_eta_explotacion,fk_eta_estatus) VALUES ('II: Geologia de superficie',76,'1'),('II: Geologia de superficie',77,'1'),('II: Geologia de superficie',78,'1'),('II: Geologia de superficie',79,'1'),('II: Geologia de superficie',80,'1'),('II: Geologia de superficie',81,'1'),('II: Geologia de superficie',82,'1'),('II: Geologia de superficie',83,'1'),('II: Geologia de superficie',84,'1'),('II: Geologia de superficie',85,'1'),('II: Geologia de superficie',86,'1'),('II: Geologia de superficie',87,'1'),('II: Geologia de superficie',88,'1'),('II: Geologia de superficie',89,'1'),('II: Geologia de superficie',90,'1'),('II: Geologia de superficie',91,'1'),('II: Geologia de superficie',92,'1'),('II: Geologia de superficie',93,'1'),('II: Geologia de superficie',94,'1'),('II: Geologia de superficie',95,'1'),('II: Geologia de superficie',96,'1');

INSERT INTO inventario(
 inv_cantidadmovimiento,inv_cantidadactual, inv_fechamovimiento, fk_inv_venta, fk_inv_explotacion, fk_inv_minpre)
	VALUES
(5000		,5000		,'2017-01-15',	null,	14	,1),(7000		,7000		,'2017-01-16',	null,	64	,2),
(16000000	,16000000	,'2017-01-17',	null,	21	,3),(25000000	,25000000	,'2017-01-18',	null,	23	,4),
(90000		,90000		,'2017-01-19',	null,	52	,5),(70000		,70000		,'2017-01-20',	null,	62	,6),
(2000		,2000		,'2017-01-21',	null,	88	,7),(60000		,60000		,'2017-01-22',	null,	77	,8),
(5000		,5000		,'2017-01-23',	null,	35	,9),(500000		,500000		,'2017-01-24',	null,	19	,10),
(90000		,90000		,'2017-01-25',	null,	29	,11),(180500	,180500		,'2017-01-26',	null,	17	,12),
(9000		,9000		,'2017-01-27',	null,	24	,13),(40000		,40000		,'2017-01-28',	null,	92	,14),
(100000		,100000		,'2017-01-29',	null,	85	,15),(9000		,9000		,'2017-01-30',	null,	68	,16),
(200000		,200000		,'2017-01-31',	null,	78	,17),(10000		,10000		,'2017-02-01',	null,	33	,18),
(1000		,1000		,'2017-02-02',	null,	90	,19),(14000		,14000		,'2017-02-03',	null,	14	,20),
(700000		,700000		,'2017-02-04',	null,	70	,21),(75000		,75000		,'2017-02-05',	null,	2	,22),
(60000		,60000		,'2017-02-06',	null,	8	,23),(60000		,60000		,'2017-02-07',	null,	93	,24),
(700		,700		,'2017-02-08',	null,	26	,25),(5000		,5000		,'2017-02-09',	null,	27	,26),
(4000		,4000		,'2017-02-10',	null,	83	,27),(600000000	,600000000	,'2017-02-11',	null,	73	,28),
(700500		,700500		,'2017-02-12',	null,	96	,29),(600	    ,600		,'2017-02-13',	null,	81	,30),
(6400000    ,6400000	,'2017-02-14',	null,	44	,31),(9000		,9000		,'2017-02-15',	null,	64	,32),
(150000		,150000		,'2017-02-16',	null,	55	,33),(6000		,6000		,'2017-02-17',	null,	47	,34),
(150000		,150000		,'2017-02-18',	null,	45	,35),(6000		,6000		,'2017-02-19',	null,	89	,36),
(8000		,8000		,'2017-02-20',	null,	46	,37),(120000	,120000		,'2017-02-21',	null,	15	,38),
(7000		,7000		,'2017-02-22',	null,	10	,39),(6000		,6000		,'2017-02-23',	null,	56	,40),
(6000		,6000		,'2017-02-24',	null,	57	,41),(150000	,150000		,'2017-02-25',	null,	55	,42),
(10000		,10000		,'2017-02-26',	null,	82	,43),(7000		,7000		,'2017-02-27',	null,	86	,44),
(150000		,150000		,'2017-02-28',	null,	61	,45),(25000		,25000		,'2017-03-01',	null,	6	,46),
(51000		,51000		,'2017-03-02',	null,	43	,47),(90000		,90000		,'2017-03-03',	null,	84	,48),
(700500		,700500		,'2017-03-04',	null,	80	,49),(600000	,600000		,'2017-03-05',	null,	28	,50),
(7000		,7000		,'2017-03-06',	null,	34	,51),(18050		,18050		,'2017-03-07',	null,	25	,52),
(600000		,600000		,'2017-03-08',	null,	36	,53),(4000		,4000		,'2017-03-09',	null,	67	,54),
(7000		,7000		,'2017-03-12',	null,	72	,55),(-100		,4900		,'2019-01-06',	1	,null	,1),
(-10		,89990		,'2019-01-07',	2	,null	,5),(-50		,6950		,'2019-01-08',	2	,null	,2),
(-15		,15999985	,'2019-01-09',	3	,null	,3),(-25		,24999975	,'2019-01-10',	4	,null	,4),
(-21		,89979		,'2019-01-11',	5	,null	,5),(-65		,69935		,'2019-01-12',	6	,null	,6),
(-250		,1750		,'2019-01-13',	7	,null	,7),(-10		,59990		,'2019-01-14',	8	,null	,8),
(-11		,4989		,'2019-01-15',	9	,null	,9),(-9			,499991		,'2019-01-16',	10	,null	,10),
(-120		,89880		,'2019-01-17',	11	,null	,11),(-95		,180405		,'2019-01-18',	12	,null	,12),
(-50		,8950		,'2019-01-19',	13	,null	,13),(-11		,39989		,'2019-01-20',	14	,null	,14),
(-40		,99960		,'2019-01-21',	15	,null	,15),(-6		,8994		,'2019-01-22',	16	,null	,16),
(-72		,199928		,'2019-01-23',	17	,null	,17),(-10		,9990		,'2019-01-24',	18	,null	,18),
(-100		,900		,'2019-01-25',	19	,null	,19),(-460		,13540		,'2019-01-26',	20	,null	,20),
(-82		,699918		,'2019-01-27',	21	,null	,21),(-61		,74939		,'2019-01-28',	22	,null	,22),
(-12		,59988		,'2019-01-29',	23	,null	,23),(-25		,59975		,'2019-01-30',	24	,null	,24),
(-411		,289		,'2019-01-31',	25	,null	,25),(-65		,4935		,'2019-02-01',	26	,null	,26),
(-45		,3955		,'2019-02-02',	27	,null	,27),(-140		,599999860	,'2019-02-03',	28	,null	,28),
(-150		,700350		,'2019-02-04',	29	,null	,29),(-4		,596		,'2019-02-05',	30	,null	,30),
(-35		,6399965	,'2019-02-06',	31	,null	,31),(-10		,8990		,'2019-02-07',	32	,null	,32),
(-16		,149984		,'2019-02-08',	33	,null	,33),(-102		,5898		,'2019-02-09',	34	,null	,34),
(-100		,149900		,'2019-02-10',	35	,null	,35);

INSERT INTO detalle_ven (fk_dev_venta, dev_monto, dev_cantidad, fk_dev_min_pre)
VALUES
(16800,	100	,1	,	168 ), (1990,	10	,5	,	199),(9800,	50	,2	,	196),(2850,	15	,3	,	190),(2050,	25	,4	,	82),
(4179,	21	,5	,	199),(5070,	65	,6	,	78),(15750,	250	,7	,	63),(950	,	10	,8	,	95),(1111,	11	,9	,	101),
(522	,	9	,10,	58),(19920,	120	,11,	166),(9880,	95	,12,	104),(7950,	50	,13,	159),(572	,	11	,14,	52),
(3600,	40	,15,	90),(342	,	6	,16,	57),(4680,	72	,17,	65),(1620,	10	,18,	162),(18500,	100	,19,	185),
(69000,	460	,20,	150),(6150,	82	,21,	75),(10736,	61	,22,	176),(2004,	12	,23,	167),(1800,	25	,24,	72),
(32469,	411	,25,	79),(7150,	65	,26,	110),(3330,	45	,27,	74),(11340,	140	,28,	81),(18900,	150	,29,	126),(216	,	4	,30,	54),
(3430,	35	,31,	98),(880	,	10	,32,	88),(3168,	16	,33,	198),(5610,	102	,34,	55),(10500,	100	,35,	105);
