"use client";

import React from "react";
import { LoginForm } from "../../forms/LoginForm";
import { LoginFormData } from "../../../types/auth";
import { useAuth } from "../../../contexts/AuthContext";
import "./LoginPage.scss";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (error) {
      // Error handling is done in the LoginForm component
      throw error;
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__header">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="login-page__brand-text">Blackhole Labs</span>
        </div>

        <h1 className="login-page__title">Welcome to Blackhole Portal</h1>

        <h2 className="login-page__subtitle">Log in</h2>

        <div className="login-page__form">
          <LoginForm onSubmit={handleLogin} />
        </div>

        <div className="login-page__footer">
          <span>©</span>
          <a href="#">Terms of Use</a>
          <span>•</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};
