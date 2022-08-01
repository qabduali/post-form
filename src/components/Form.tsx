import '../styles/form.scss';

import { ChangeEvent, FormEvent, useState } from 'react';

import { useMutateForm } from '../api/useMutateForm';
import { validate } from '../utils/validation';

type errors = {
  birthDate: boolean;
  email: boolean;
  message: boolean;
  name: boolean;
  phone: boolean;
};

const Form = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('+7');
  const [birthDate, setBirthDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [errors, setErrors] = useState<errors>();
  const postForm = useMutateForm();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('+7');
    setBirthDate('');
    setMessage('');
  };

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/ /gm, '');
    let num = `${val.substring(0, 2)} ${val.substring(2, 5)} ${val.substring(5, 8)} ${val.substring(
      8,
      val.length,
    )}`;
    num = num.trim();
    setPhone(num);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsPosting(true);
    e.preventDefault();
    const errorName = validate(name, 'name');
    const errorEmail = validate(email, 'email');
    const errorPhone = validate(phone, 'phone');
    const errorText = validate(message, 'textarea');
    setErrors({
      birthDate: false,
      email: errorEmail,
      message: errorText,
      name: errorName,
      phone: errorPhone,
    });
    !errorText &&
      !errorPhone &&
      !errorEmail &&
      !errorName &&
      postForm.mutateAsync(
        {
          birthDate: birthDate,
          email: email,
          message: message,
          name: name,
          phone: phone,
        },
        {
          onSettled: () => {
            resetForm();
            setIsPosting(false);
          },
        },
      );
    setIsPosting(false);
  };

  return (
    <>
      <div className="form">
        <h3>Feedback Form</h3>
        <form noValidate onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="fullName">Full name: </label>
          <input
            id="fullName"
            name="fullName"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="Name Surname"
            required
            type="text"
            value={name}
          />
          {errors?.name && (
            <p className="error">
              The name should consist only first name and last name, both not less than 3 characters
              and not more than 30 characters.
            </p>
          )}
          <br />
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            type="email"
            value={email}
          />
          {errors?.email && <p className="error">Wrong email.</p>}
          <br />
          <label htmlFor="phone">Phone Number: </label>
          <input
            id="phone"
            name="phone"
            onChange={(e) => {
              onPhoneChange(e);
            }}
            required
            type="tel"
            value={phone}
          />
          {errors?.phone && (
            <p className="error">Phone number should be like this: +7 777 777 7777</p>
          )}
          <br />
          <label htmlFor="birthDate">Birth Date: </label>
          <input
            id="birthDate"
            name="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
            required
            type="date"
            value={birthDate}
          />
          {errors?.birthDate && <p className="error">Wrong date.</p>}
          <br />
          <label htmlFor="message">Message: </label>
          <textarea
            cols={50}
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave your message here."
            required
            rows={3}
            value={message}
          />
          {errors?.message && (
            <p className="error">
              Message should be not less than 10, not more than 300 characters.
            </p>
          )}
          <br />
          <input disabled={isPosting} type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Form;
