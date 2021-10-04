

create table if not exists devices
(
    id         int auto_increment,
    hash       varchar(255)                          not null,
    created_on timestamp default current_timestamp() not null,
    updated_on timestamp default current_timestamp() not null on update current_timestamp(),
    constraint users_hash_key_uindex
        unique (hash),
    constraint users_id_uindex
        unique (id)
);

alter table devices
    add primary key (id);

create table if not exists recordings
(
    id           int auto_increment,
    duration     int                                   not null,
    distance     double                                not null,
    start        datetime                              null,
    end          datetime                              null,
    carrier      varchar(255)                          not null,
    manufacturer varchar(255)                          not null,
    os           varchar(255)                          not null,
    notes        varchar(255)                          null,
    device_id    int       default -1                  null,
    created_on   timestamp default current_timestamp() not null,
    updated_on   timestamp default current_timestamp() not null on update current_timestamp(),
    constraint recordings_id_uindex
        unique (id),
    constraint recordings_devices_id_fk
        foreign key (device_id) references devices (id)
            on update cascade on delete cascade
);

alter table recordings
    add primary key (id);

create table if not exists features
(
    id         int auto_increment,
    timestamp  datetime                              not null,
    battery    int                                   not null,
    network    varchar(255)                          not null,
    service    tinyint(1)                            not null,
    connected  tinyint(1)                            not null,
    http       tinyint(1)                            not null,
    lat        double                                not null,
    lon        double                                not null,
    accuracy   double                                not null,
    speed      double                                not null,
    notes      varchar(255)                          null,
    recording_id    int                                   not null,
    created_on timestamp default current_timestamp() not null,
    updated_on timestamp default current_timestamp() not null on update current_timestamp(),
    constraint features_id_uindex
        unique (id),
    constraint features_recordings_id_fk
        foreign key (recording_id) references recordings (id)
            on update cascade on delete cascade
);

alter table features
    add primary key (id);

create table if not exists users
(
    id         int auto_increment,
    username   varchar(255)                          not null,
    password   varchar(255)                          not null,
    created_on timestamp default current_timestamp() not null,
    updated_on timestamp default current_timestamp() not null on update current_timestamp(),
    constraint users_id_uindex
        unique (id),
    constraint users_username_uindex
        unique (username)
);

alter table users
    add primary key (id);