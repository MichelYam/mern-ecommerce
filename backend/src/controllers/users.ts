import { Handler, RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../models/user";
import bcrypt from "bcrypt";
import keys from "../config/keys";
import jwt from "jsonwebtoken";
import randomBytes from 'randombytes';
import { sendEmail } from "../services/nodemailer";

const { secret, tokenLife } = keys.jwt;
interface JwtPayload {
    id: string
}

export const getAuthenticatedUser: RequestHandler = async (req: any, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select("-password");

        if (!user) {
            throw new Error("User not found!");
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

interface SignUpBody {
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
}
export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        if (!firstName || !lastName) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: 'That email address is already in use.' });
        }

        // let subscribed = false;
        // if (isSubscribed) {
        //     const result = await mailchimp.subscribeToNewsletter(email);

        //     if (result.status === 'subscribed') {
        //         subscribed = true;
        //     }
        // }

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        const payload = {
            id: registeredUser.id
        };

        // await mailgun.sendEmail(
        //     registeredUser.email,
        //     'signup',
        //     null,
        //     registeredUser
        // );

        const token = jwt.sign(payload, secret as string, { expiresIn: tokenLife });

        res.status(200).json({
            success: true,
            // subscribed,
            token: `Bearer ${token}`,
            user: {
                id: registeredUser.id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                role: registeredUser.role
            }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

interface LoginBody {
    email?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findOne({ email }).select("password");
        if (!user) {
            return res
                .status(400)
                .send({ error: 'No user found for this email address.' });
        }

        // if (user && user.provider !== EMAIL_PROVIDER.Email) {
        //     return res.status(400).send({
        //         error: `That email address is already in use using ${user.provider} provider.`
        //     });
        // }
        const isVerify = await bcrypt.compare(password, user.password);

        if (!isVerify) {
            return res.status(400).json({
                success: false,
                error: 'Password Incorrect'
            });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, secret as string, { expiresIn: tokenLife });

        if (!token) {
            throw new Error();
        }

        res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

interface forgotBody {
    email?: string,
}

export const forgot: RequestHandler<unknown, unknown, forgotBody, unknown> = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: 'You must enter an email address.' });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res
                .status(400)
                .send({ error: 'No user found for this email address.' });
        }

        const buffer = randomBytes(48);
        const resetToken = buffer.toString('hex');

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000;

        existingUser.save();
        // console.log(req.headers)
        await sendEmail(existingUser.email, 'reset', "localhost:3000", resetToken);

        res.status(200).json({
            success: true,
            message: 'Please check your email for the link to reset your password.'
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}
interface resetBody {
    password: string
}
export const reset: RequestHandler<unknown, unknown, resetBody, unknown> = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const resetUser = await User.findOne({
            resetPasswordToken: (req.params as any).token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!resetUser) {
            return res.status(400).json({
                error:
                    'Your token has expired. Please attempt to reset your password again.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        resetUser.password = hash;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;

        resetUser.save();
        // await mailgun.sendEmail(resetUser.email, 'reset-confirmation');
        await sendEmail(resetUser.email, 'reset-confirmation', req.headers.host);

        res.status(200).json({
            success: true,
            message:
                'Password changed successfully. Please login with your new password.'
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

export const updateUser: RequestHandler = async (req: any, res) => {
    try {
        const jwtToken = req.headers.authorization?.split("Bearer")[1].trim();
        const { id } = jwt.decode(jwtToken) as JwtPayload;
        const update = req.body;
        const query = { _id: id };

        const userDoc = await User.findOneAndUpdate(query, update, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: 'Your profile is successfully updated!',
            user: userDoc,
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
        });
    }
};