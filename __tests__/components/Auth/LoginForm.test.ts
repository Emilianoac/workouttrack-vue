import { it, describe, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import LoginForm from "@/components/Auth/LoginForm.vue";

describe("LoginForm", () => {
  it("Should render form fields correctly", () => {
    const wrapper = mount(LoginForm);

    const emailField = wrapper.find("[data-testid='email-input']");
    const passwordField = wrapper.find("[data-testid='password-input']");
    const submitButton = wrapper.find("[data-testid='submit-button']");

    expect(emailField.exists()).toBe(true);
    expect(passwordField.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  describe("Form Validation", () => {
    it("Should validate email and password fields", async () => {
      const wrapper = mount(LoginForm);
      const emailField = wrapper.find("[data-testid='email-input']");
      const passwordField = wrapper.find("[data-testid='password-input']");
      const form = wrapper.find("[data-testid='login-form']");

      await emailField.setValue("test@example.com");
      await passwordField.setValue("password");
      await form.trigger("submit.prevent");
      await flushPromises();

      const emailErrors = wrapper.find("[data-testid='email-errors']");
      const passwordErrors = wrapper.find("[data-testid='password-errors']");
      expect(emailErrors.exists()).toBe(false);
      expect(passwordErrors.exists()).toBe(false);
    });

    describe("Email field", () => {
      it("Should show error if invalid email is entered and submitted", async () => {
        const wrapper = mount(LoginForm);

        const emailField = wrapper.find("[data-testid='email-input']");
        const form = wrapper.find("[data-testid='login-form']");

        await emailField.setValue("invalid-email");
        await form.trigger("submit.prevent");

        await flushPromises();

        const errorMessage = wrapper.find("[data-testid='email-errors']");
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toContain("Ingresa un correo electrónico válido.");
      });

      it("Should show error if empty email is submitted", async () => {
        const wrapper = mount(LoginForm);

        const emailField = wrapper.find("[data-testid='email-input']");
        const form = wrapper.find("[data-testid='login-form']");

        await emailField.setValue("");
        await form.trigger("submit.prevent");

        await flushPromises();

        const errorMessage = wrapper.find("[data-testid='email-errors']");
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toContain("Ingresa un correo electrónico válido.");
      });
    });

    describe("Password field", () => {
      it("Should show length error if password is too short", async () => {
        const wrapper = mount(LoginForm);

        const passwordField = wrapper.find("[data-testid='password-input']");
        const form = wrapper.find("[data-testid='login-form']");

        await passwordField.setValue("short");
        await form.trigger("submit.prevent");

        await flushPromises();

        const errorMessage = wrapper.find("[data-testid='password-errors']");
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toContain("La contraseña debe tener al menos 6 caracteres.");
      });

      it("Should show length error if password is too long", async () => {
        const wrapper = mount(LoginForm);

        const passwordField = wrapper.find("[data-testid='password-input']");
        const form = wrapper.find("[data-testid='login-form']");

        await passwordField.setValue("thisisaverylongpassword");
        await form.trigger("submit.prevent");

        await flushPromises();

        const errorMessage = wrapper.find("[data-testid='password-errors']");
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toContain("La contraseña no puede tener más de 20 caracteres.");
      });

      it("Should show error if password is empty", async () => {
        const wrapper = mount(LoginForm);

        const passwordField = wrapper.find("[data-testid='password-input']");
        const form = wrapper.find("[data-testid='login-form']");

        await passwordField.setValue("");
        await form.trigger("submit.prevent");

        await flushPromises();

        const errorMessage = wrapper.find("[data-testid='password-errors']");
        expect(errorMessage.exists()).toBe(true);
        expect(errorMessage.text()).toContain("La contraseña es obligatoria.");
      });
    });
  });
});
