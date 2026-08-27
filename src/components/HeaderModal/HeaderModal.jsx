import { useState } from "react";
import {
  Modal,
  ModalCard,
  CloseButton,
  Title,
  Subtitle,
  Form,
  Field,
  Input,
  CheckboxField,
  SubmitButton,
  ErrorText,
} from "./HeaderModal.styled";

export const HeaderModal = ({ isOpen, onClose, setUser }) => {
  const emptyFormData = {
    name: "",
    email: "",
    password: "",
    agree: false,
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const nextValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    if (name === "name") {
      localStorage.setItem("name", value);
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Ім'я обов'язкове";
    else if (formData.name.trim().length < 3) {
      nextErrors.name = "Ім'я повинно містити мінімум 3 символи";
    }

    if (!formData.email.trim()) nextErrors.email = "Email обов'язковий";
    else if (!formData.email.includes("@")) {
      nextErrors.email = "Введіть правильний email";
    }

    if (!formData.password.trim()) nextErrors.password = "Пароль обов'язковий";
    else if (formData.password.length < 6) {
      nextErrors.password = "Пароль має містити щонайменше 6 символів";
    }

    if (!formData.agree) nextErrors.agree = "Потрібно погодитися з умовами";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      onClose();
      setFormData(emptyFormData);
      setErrors({});
    }
  };

  return (
    <Modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
      $isOpen={isOpen}
      onClick={onClose}
    >
      <ModalCard $isOpen={isOpen} onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" aria-label="Close modal" onClick={onClose}>
          ×
        </CloseButton>

        <Title id="signup-title">Sign up</Title>
        <Subtitle>Create your account to continue</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <span>Name</span>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name ? (
              <ErrorText>{errors.name}</ErrorText>
            ) : null}
          </Field>

          <Field>
            <span>Email</span>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email ? (
              <ErrorText>{errors.email}</ErrorText>
            ) : null}
          </Field>

          <Field>
            <span>Password</span>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password ? (
              <ErrorText>{errors.password}</ErrorText>
            ) : null}
          </Field>

          <CheckboxField>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>I agree to the terms and conditions</span>
          </CheckboxField>
          {errors.agree ? (
            <ErrorText>{errors.agree}</ErrorText>
          ) : null}

          <SubmitButton type="submit">Create account</SubmitButton>
        </Form>
      </ModalCard>
    </Modal>
  );
};
