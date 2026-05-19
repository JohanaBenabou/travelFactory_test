import {
  Request,
  Response,
} from "express";

import { AppDataSource } from "../config/data-source";

import { User } from "../entities/User";

export const signup = async (
  req: Request,
  res: Response
) => {

  console.log(
    "========== SIGNUP START =========="
  );

  try {

    console.log(
      "BODY RECEIVED:",
      req.body
    );

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    console.log(
      "EXTRACTED VALUES:"
    );

    console.log("name:", name);

    console.log("email:", email);

    console.log("password:", password);

    console.log("role:", role);

    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {

      console.log(
        "MISSING REQUIRED FIELDS"
      );

      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    console.log(
      "GETTING USER REPOSITORY..."
    );

    const userRepository =
      AppDataSource.getRepository(
        User
      );

    console.log(
      "CHECKING IF USER EXISTS..."
    );

    const existingUser =
      await userRepository.findOne({
        where: {
          email,
        },
      });

    console.log(
      "EXISTING USER RESULT:",
      existingUser
    );

    if (existingUser) {

      console.log(
        "USER ALREADY EXISTS"
      );

      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    console.log(
      "CREATING NEW USER..."
    );

    const newUser =
      userRepository.create({
        name,
        email,
        password,
        role,
      });

    console.log(
      "NEW USER CREATED:",
      newUser
    );

    console.log(
      "SAVING USER..."
    );

    await userRepository.save(
      newUser
    );

    console.log(
      "USER SAVED SUCCESSFULLY"
    );

    console.log(
      "========== SIGNUP SUCCESS =========="
    );

    return res.status(201).json({
      message:
        "Account created",

      user: newUser,
    });

  } catch (error) {

    console.log(
      "========== SIGNUP ERROR =========="
    );

    console.log(error);

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};

export const signin = async (
  req: Request,
  res: Response
) => {

  console.log(
    "========== SIGNIN START =========="
  );

  try {

    console.log(
      "BODY RECEIVED:",
      req.body
    );

    const {
      email,
      password,
    } = req.body;

    console.log(
      "EMAIL:",
      email
    );

    console.log(
      "PASSWORD:",
      password
    );

    const userRepository =
      AppDataSource.getRepository(
        User
      );

    console.log(
      "SEARCHING USER..."
    );

    const user =
      await userRepository.findOne({
        where: {
          email,
        },
      });

    console.log(
      "USER FOUND:",
      user
    );

    if (
      !user ||
      user.password !== password
    ) {

      console.log(
        "INVALID CREDENTIALS"
      );

      return res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

    console.log(
      "SIGNIN SUCCESS"
    );

    return res.status(200).json(user);

  } catch (error) {

    console.log(
      "========== SIGNIN ERROR =========="
    );

    console.log(error);

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};