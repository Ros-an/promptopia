"use client";
import Image from "next/image";
import Link from "next/link";
import {
    ClientSafeProvider,
    LiteralUnion,
    getProviders,
    signIn,
    signOut,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers";

export default function Nav() {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
    return (
        <nav className="flex-between w-full pt-3 mb-16">
            <Link href="/" className="flex flex-center gap-2">
                <Image
                    src={"/assets/images/logo.svg"}
                    alt={"Logo"}
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompts"} className="black_btn">
                            Create Prompt
                        </Link>
                        <button onClick={signOut} className="outline_btn" type="button">
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                src={"/assets/images/logo.svg"}
                                alt={"profile"}
                                className="rounded-full"
                                height={37}
                                width={37}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                return (
                                    <button
                                        type="button"
                                        className="black_btn"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        Sign In
                                    </button>
                                );
                            })}
                    </>
                )}
            </div>
            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            src={"/assets/images/logo.svg"}
                            alt={"profile"}
                            className="rounded-full"
                            height={37}
                            width={37}
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_item"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_item"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => {
                                return (
                                    <button
                                        type="button"
                                        className="black_btn"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        Sign In
                                    </button>
                                );
                            })}
                    </>
                )}
            </div>
        </nav>
    );
}
