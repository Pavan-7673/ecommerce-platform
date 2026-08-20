# E-Commerce Platform

A full-stack E-Commerce application built using React, Spring Boot, MySQL, Docker, Kubernetes, and AWS.

## Overview

This project demonstrates the development, containerization, deployment, and operation of a modern cloud-native E-Commerce application.

The application consists of a React frontend, Spring Boot backend, and MySQL database.

## Architecture

```text
                    Users
                      |
                      v
               React Frontend
                      |
                      v
             Spring Boot Backend
                      |
                      v
                   MySQL

Technology Stack
Frontend
React.js
Vite
JavaScript
React Router
Lucide React

Backend
Java
Spring Boot
Maven
REST APIs
Database

MySQL
Containerization
Docker

Dockerfiles
Docker Images

Cloud & Infrastructure
AWS
Amazon EKS
Amazon ECR
VPC
EC2
IAM

Terraform

Kubernetes
Deployments
Services
ConfigMaps
Secrets
Horizontal Pod Autoscaler
Namespaces

ecommerce-platform/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md
