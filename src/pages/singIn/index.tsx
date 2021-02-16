import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer,Logo } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/authContext';
import { useToast } from '../../hooks/toastContext';

interface FormData {
  email: string;
  password: string;
}

// página de login com utilização do @unform com validação dos inputs

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('enter a valid email')
            .required('email is required'),
          password: Yup.string().required('password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErros = getValidationErrors(err);

          formRef.current?.setErrors(validationErros);

          addToast({
            type: 'error',
            title: 'erro na autenticação',
            description: 'ocorreu um erro, cheque suas credenciais',
          });
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo>Tasker</Logo>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu login</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Entrar</Button>

            <a href="/">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar minha conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
