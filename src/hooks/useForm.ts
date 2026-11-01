import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import type { LoginForm } from "../auth";

type FormValidations = Record<
  string,
  [(value: string | undefined) => boolean, string]
>;

export const useForm = (
  initialForm: LoginForm = {},
  formValidations: FormValidations = {},
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

  const createValidators = () => {
    const formCheckedValues: Record<string, string | null> = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField as keyof LoginForm])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  useEffect(() => {
    createValidators();
  }, [formState, createValidators]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
