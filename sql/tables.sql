DROP TABLE brands, colours, items, cart ;

create table brands (
    id serial primary key not null,
    name text not null
);

alter sequence brands_id_seq RESTART 1;

create table colours (
    id serial primary key not null,
    colourTag text not null
);

alter sequence colours_id_seq RESTART 1;

create table items(
    id serial primary key not null,
    price FLOAT not null,
    old_price FLOAT,
    size int not null,
    stock int not null,
    brand_id int not null,
    colour_id int not null,
    FOREIGN key (brand_id) references brands(id),
    FOREIGN key (colour_id) references colours(id)
);

alter sequence items_id_seq RESTART 1;

create table cart (
    id serial primary key not null,
    shoe text not null,
    shoeColour text not null,
    price FLOAT not null,
    size int not null,
    stock int not null,
    item_id int not null,
    foreign key (item_id) REFERENCES items(id)
);

-- insert into cart (shoe, shoeColour, price, size, quantity, item_id) values ('amateki','white',890.99,6,15,71);
 
alter SEQUENCE cart_id_seq RESTART 1;

\i sql/insertDefault.sql  

