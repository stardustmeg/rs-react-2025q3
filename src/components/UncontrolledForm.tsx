import clsx from 'clsx';
import { type JSX, useRef, useState } from 'react';
import { z } from 'zod';

import type { FormData, FormErrors } from '@/types/form';

import { CountriesSelect } from '@/components/form/CountriesSelect';
import { FormField } from '@/components/form/FormField';
import { FormFooter } from '@/components/form/FormFooter';
import { GenderSelect } from '@/components/form/GenderSelect';
import { PasswordInput } from '@/components/form/password/PasswordInput';
import { useAppDispatch } from '@/hooks/redux';
import { addSubmission } from '@/store/slices/formSlice';
import styles from '@/styles/Form.module.css';
import { fileToBase64, validateFile } from '@/utils/fileUtils';
import { formSchema, type FormSchema } from '@/validation/schemas';

interface UncontrolledFormProps {
  onClose: () => void;
}

export function UncontrolledForm({ onClose }: UncontrolledFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formReference = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const pictureFile = formData.get('picture') as File;
      let pictureBase64 = '';

      if (pictureFile.size > 0) {
        const validation = validateFile(pictureFile);
        if (!validation.isValid) {
          setErrors({ picture: validation.error ?? 'Invalid file' });
          setIsSubmitting(false);
          return;
        }
        pictureBase64 = await fileToBase64(pictureFile);
      }

      const formValues = {
        acceptTerms: formData.get('acceptTerms') === 'on',
        age: Number(formData.get('age')),
        confirmPassword: formData.get('confirmPassword'),
        country: formData.get('country'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        name: formData.get('name'),
        password: formData.get('password'),
        picture: pictureBase64,
      };

      const validatedData = formSchema.parse(formValues);

      const submission: FormData = {
        id: crypto.randomUUID(),
        ...validatedData,
        formType: 'uncontrolled',
        timestamp: Date.now(),
      };

      dispatch(addSubmission(submission));
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        for (const issue of error.issues) {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as keyof FormSchema] = issue.message;
          }
        }
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={styles.form}
      data-testid="uncontrolled-form"
      method="post"
      noValidate
      onSubmit={handleSubmit}
      ref={formReference}
    >
      <FormField errors={errors} id="name" label="Name *" type="text" />

      <FormField errors={errors} id="age" label="Age *" max="120" min="1" type="number" />

      <FormField errors={errors} id="email" label="Email *" type="text" />

      <FormField errors={errors} id="password" label="Password *" type="password">
        <PasswordInput errors={errors} id="password" />
      </FormField>

      <FormField errors={errors} id="confirmPassword" label="Confirm Password *" type="password">
        <PasswordInput errors={errors} id="confirmPassword" />
      </FormField>

      <FormField errors={errors} id="gender" label="Gender *" type="text">
        <GenderSelect errors={errors} />
      </FormField>

      <FormField errors={errors} id="country" label="Country *" type="text">
        <CountriesSelect errors={errors} />
      </FormField>

      <FormField accept="image/png,image/jpeg,image/jpg" errors={errors} id="picture" label="Picture *" type="file" />

      <FormField errors={errors} id="acceptTerms" isCheckbox type="checkbox">
        <label className={styles.checkboxLabel}>
          <input className={clsx(errors.acceptTerms && styles.error)} name="acceptTerms" type="checkbox" />
          <span>I accept the Terms and Conditions *</span>
        </label>
      </FormField>

      <FormFooter isSubmitting={isSubmitting} onCancel={onClose} />
    </form>
  );
}
