"use client";

import Link from "next/link";
import Image from "next/image"
import logo from "@components/assets/images/logo.svg"
import profile from "@components/assets/images/logo.svg"

import {useState, useEffect} from "react"
import {signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion} from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers/index";
import { TLSSocket } from "tls";
import { Session } from "next-auth";

const Nav = () => {
    
    const {data : session}:{session: Session} = useSession();
    /*
    declaring variable and function, setting initial value to null??
    cant set this to null if using typescript, need to declare which type it will be
    can use next-auth provided types

    using next-auth provided types
    */
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    const [toggleDropdown, setToggleDropdown] = useState(false)
    /*
    to use providers use the useEffect hook 
    with a callback function
    that only runs at the start
    create a setProviders async function 
    get the response using the getProviders function from next-auth
    */
    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();

            alert(response)

            setProviders(response);
        }

        fetchProviders();
    }, [])
    
    return (

        <nav className="flex-between w-full mb-16 pt-3">

            <Link href={"/"} className="flex gap-2 flex-center">
                <Image 
                alt="PromptBasket Logo" 
                src={logo}
                width={30}
                height={30}
                className="object-contain"
                />
                <p className="logo_text">PromptBasket</p>
            </Link>

            {/* 
            if they're logged in, they see the basic nav bar options
            which allow them to create a prompt or sign out... they also see their clickable
            profile icon.
            */}

            {/*
            currently not able to see the nav bar while not signed in
            since there is no user: 
            - cant sign out 
            - cant create post
            
            */}

            {/*
            using {alert(session?.user)} we can see if user currently exists
            it logs undefined since there was no user at the time
            */}

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">
                            Create Prompt 
                        </Link>

                        {/* signOut is the next-auth provided hook
                        how exactly does it sign users out? how will it be used? */}
                        <button onClick={() => signOut()} type="button" className="outline_btn">
                            SIGN TF OUT 
                        </button>

                        <Link href={"/profile"}>
                            <Image 
                            alt={"profile image"}
                            src={profile}
                            width={37}
                            height={37}
                            className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                    {/*
                    if theyre not signed in, but 
                    there are providers (getProviders was successful)
                    shows all the different providers
                    in this case, it is google auth
                    */}

                    {/*
                    at thecurrent state, there are no providers
                    which can be seen using alert(providers)
                    */}

                    {providers &&
                        Object.values(providers).map((provider) => {
                            <button 
                                type="button" 
                                key={provider.name} 
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign TF In
                            </button>
                        })
                    }
                    </>
                )}
            </div>

            {/*
            for mobile users (small device): 
            checks if theyre logged in, 
            if they are, shows their clickable profile image with dropdown option
            for settings and similar options??
            */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image 
                            alt={"profile image"}
                            src={profile}
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick = {() => {
                                setToggleDropdown(!toggleDropdown);
                            }}
                            />

                            {/*
                            checks if the dropdown is toggled
                            if so, 
                            */}

                            {toggleDropdown &&
                            <div className="dropdown">
                                <Link 
                                href = "/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link 
                                href = "/create-prompt"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type = "button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut;
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    SIGN TF OUT
                                </button>
                            </div>
                            }
                    </div>
                ) : (
                    <>
                    {/*
                    if user was not logged in,
                    and if there are providers (getProviders was successful)
                    shows all the different providers
                    in this case, it is google auth
                    */}
                    {providers &&
                        Object.values(providers).map((provider) => {
                            <button 
                                type="button" 
                                key={provider.name} 
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign TF In with {provider.name}
                            </button>
                        })
                    }
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav;