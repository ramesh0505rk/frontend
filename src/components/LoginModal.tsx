import { useForm } from "react-hook-form"
import { LoginCredentials } from "../network/notes_api"
import * as NotesApi from "../network/notes_api"
import { User } from "../models/user"
import { Button, Form, Modal } from "react-bootstrap"
import TextInputField from "./form/TextInputField"
import styleUtils from '../styles/utils.module.css'

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>()

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In 🫎
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type='text'
                        placeholder='Enter your username'
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type='password'
                        placeholder='Enter your password 🙈'
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.password}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.btns}
                    >
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal
