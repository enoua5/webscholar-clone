-- This file initializes the database.
-- Make sure intelliJ is connected to the database in docker before running this script.
-- Note: use a backtick (`) not single quotes (') for fields.

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS account;
CREATE TABLE `account` (
                           `accountKey` INT AUTO_INCREMENT NOT NULL,
                           `email` varchar(255) NOT NULL,
                           `username` varchar(255) NOT NULL,
                           `password` varchar(100) NOT NULL,
                           `schoolid` varchar(50) NOT NULL,
                           `active` boolean NOT NULL,
                           `usertype` varchar(100) NOT NULL,
                           `firstname` varchar(100) NOT NULL,
                           `middlename` varchar(100) NOT NULL,
                           `lastname` varchar(100) NOT NULL,
                           `address1` varchar(100) NOT NULL,
                           `address2` varchar(100) NOT NULL,
                           `city` varchar(100) NOT NULL,
                           `state` varchar(100) NOT NULL,
                           `zipcode` varchar(10) NOT NULL,
                           `school` varchar(100) NOT NULL,
                           `sex` varchar(6) NOT NULL,
                           `race` varchar(100) NOT NULL,
                           `deleteLinkHash` varchar(100) NOT NULL,
                           `deleteLinkDate` datetime NOT NULL,
                           `forgotPassHash` varchar(100) NOT NULL,
                           `forgotPassDate` datetime NOT NULL,
                           PRIMARY KEY (`accountKey`)
);

commit;

DROP TABLE IF EXISTS scholarship;
CREATE TABLE `scholarship` (
                               `scholarshipId` INT AUTO_INCREMENT NOT NULL,
                               `title` varchar(255) NOT NULL,
                               `organization` varchar(255) NOT NULL,
                               `description` varchar(100) NOT NULL,
                               `requirements` varchar(50) NOT NULL,
                               `amount` DECIMAL(18,2) NOT NULL,
                               `applyDeadline` timestamp NOT NULL,
                               `levels` varchar(50) NOT NULL,
                               `awardType` varchar(50) NOT NULL,
                                PRIMARY KEY (`scholarshipId`)

);

commit;


Select * from account;
Select * from scholarship;
SET FOREIGN_KEY_CHECKS=1;

DROP TABLE IF EXISTS issue;
CREATE TABLE issue
(
    issueId     int auto_increment not null,
    status      varchar(50)  not null,
    summary     varchar(150) not null,
    description varchar(500) not null,
    severity    varchar(100) not null,
    priority    varchar(50)  not null,
    reporterId  int          not null,
    workerId    int          null,
    stepsToReCreate varchar(500) not null,
PRIMARY KEY (`issueId`),
    constraint reporter_fk
        foreign key (reporterId) references account (accountKey),
    constraint worker_fk
        foreign key (workerId) references account (accountKey)
);
commit;

# DROP TABLE IF EXISTS accountscholarship;
# CREATE TABLE `accountscholarship` (
#   `comboId` INT AUTO_INCREMENT NOT NULL,
#   `accountKey` INT NOT NULL,
#   `scholarshipId` INT NOT NULL,
#   PRIMARY KEY (`comboId`),
#   FOREIGN KEY (accountKey) REFERENCES account(accountKey),
#   FOREIGN KEY (scholarshipId) REFERENCES scholarship(scholarshipId)
# );
#
# commit;

# Select * from user;
# Select * from account;
# Select * from scholarship;
# Select * from accountscholarship