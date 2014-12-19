drop table if exists users CASCADE;
drop table if exists sources CASCADE;
drop table if exists usersSubscribedSources CASCADE;
drop table if exists usersSubscribedFeeder CASCADE;
drop table if exists settings CASCADE;
drop table if exists passwords CASCADE;
drop table if exists filters CASCADE;

create table users (
  username varchar(50),
  uID SERIAL,
  -- settingsID int,
  primary key (uID)
);

create table passwords (
	uID int,
	foreign key (uID) references users,
	password varchar
);

create table sources (
	sourceID SERIAL,
  sourceLink varchar(100),
  contentCategory varchar(50),
  rank int,
  primary key (sourceID)
);

create table usersSubscribedSources (
  uID int,
  sourceID int,
  broadcasting boolean,
  foreign key (uID) references users,
  foreign key (sourceID) references sources,
  unique(uID, sourceID)
);

create table usersSubscribedFeeder (
  uID int,
  feederID int,
  foreign key (uID) references users,
  foreign key (feederID) references users,
  unique(uID, feederID)
);

create table filters(
  fID SERIAL,
  uID int,
  sourceID int,
  filterName varchar(50),
  foreign key (uID) references users,
  foreign key (sourceID) references sources,
  unique(uID, sourceID, fID)
);

create table settings (
  settingsID SERIAL
);