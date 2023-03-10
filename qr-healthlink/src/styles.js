import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.div`
  align-items: center;
  display: flex;
  background-color: #1976d2;
  color: #ffffff;
  font-weight: 500;
  position: static;
  gap: 0 1rem;
  justify-content: center;
  padding: 1rem;
`;

export const NavButton = styled(Link)`
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
`;

export const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`;

export const Form = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: 1rem;
`;

export const InputTitle = styled.p`
  color: #545454;
  font-weight: 500;
  font-size: 1rem;
  margin: 1rem 0;
`;

export const Input = styled.input`
  border: 1px solid #bfbfbf;
  border-radius: 0.25rem;
  color: #545454;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem 1rem;
  width: 100%;
`;

export const BigInput = styled.textarea`
  border: 1px solid #bfbfbf;
  border-radius: 0.25rem;
  padding: 0 1rem;
  resize: none;
  width: 100%;
`;

export const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Sep = styled.p`
  border: 1px solid #bfbfbf;
`;

export const Code = styled.p``;

export const Download = styled.button`
  border-radius: 1rem;
  background-color: #1976d2;
  color: white;
  font-weight: 500;
  text-decoration: none;
  padding: 1rem;
`;
