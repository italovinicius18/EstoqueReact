CREATE TABLE product (
   id serial not null,
   name VARCHAR(50) not null,
   category VARCHAR(50) not null,
   create_date timestamp not null,
   create_user varchar(50) not null,
   modify_date timestamp not null,
   modify_user varchar(50) not null,
   constraint product_pk primary key (id)
);

CREATE TABLE supply (
   id serial not null,
   id_product integer not null,
   amount int not null,
   constraint supply_pk primary key (id),
   constraint supply_product_fk foreign key (id_product) references product(id)
);