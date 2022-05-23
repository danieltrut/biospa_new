import React from "react";

import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import EmailSender from "../EmailSender";

describe("Form validation", () => {
  describe("with valid inputs", () => {
    // Button disable for empty Name
    test("btn should be disabled for empty name", () => {
      const { getByLabelText, getByRole } = render(<EmailSender />);

      const nameInput = getByLabelText("Nimi");
      fireEvent.change(nameInput, { target: { value: "" } });
      const btn = getByRole("button", { type: "submit" });
      expect(btn).toHaveAttribute("disabled");
    });

    // Button is Action on filled Name
    test("btn should be enables for non-empty name", () => {
      const { getByLabelText, getByRole } = render(<EmailSender />);

      const nameInput = getByLabelText("Nimi");
      fireEvent.change(nameInput, { target: { value: "" } });
      const btn = getByRole("button", { type: "submit" });
      expect(btn).toHaveAttribute("disabled");

      fireEvent.change(nameInput, { target: { value: "Julia Taro" } });
    });

    // pass invalid email to test input value
    test("btn throws message for wrong email address", () => {
      const { getByLabelText, getByRole, getByTestId } = render(
        <EmailSender />
      );

      const emailInput = getByLabelText("E-post");
      fireEvent.change(emailInput, { target: { value: "invalidemail" } });
      expect(getByTestId("error-msg")).toBeInTheDocument();

      const inputEl = getByTestId("email-input");
      userEvent.type(inputEl, "test");

      expect(getByTestId("email-input")).toBeVisible();
      expect(getByTestId("error-msg")).toBeInTheDocument();
      expect(getByTestId("error-msg").textContent).toEqual(
        "Palun sisestage aadress õigesti."
      );
    });
  });
});
