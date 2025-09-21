import React from "react";
import WidthConstraint from "./ui/width-constraint";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <>
      <WidthConstraint>
        <section className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] place-content-center gap-40">
          <div>
            <Link href={"/"} className="font-leckerli text-4xl hover-underline">
              Sektrails
            </Link>

            <p className="mt-5 max-w-sm text-justify font-medium">
              Detailed information about your favorite movies, TV shows, and
              trending content — all in one place.
            </p>
            <div className="flex gap-5 mt-5">
              {SOCIAL_LINKS.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={social.imgPath}
                      alt={social.name}
                      width={36}
                      height={36}
                      className="drop-shadow-md drop-shadow-white/80 hover:scale-110 hover:drop-shadow-accent transition-all duration-500 ease-in-out"
                    />
                  </a>
                );
              })}
            </div>
          </div>
          {FOOTER_LINKS.map((col, index) => {
            return (
              <div key={index} className="ml-auto">
                <h3 className="hover-underline">{col.header}</h3>
                {col.links.map((link, locus) => {
                  return (
                    <Link
                      href={link.sublink}
                      key={locus}
                      className="block my-5"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </section>
      </WidthConstraint>
      <hr className="w-11/12 mx-auto bg-white" />
      <WidthConstraint>
        <section className="flex flex-col sm:flex-row justify-between items-center">
          <p>
            Copyright &copy;{new Date().getFullYear()} Sektrails | All rights
            reserved{" "}
          </p>
          <p className="flex">
            Designed By
            <a
              href={"https://www.linkedin.com/in/sekyls"}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-bold italic"
            >
              dev_sekyls
            </a>
          </p>
        </section>
      </WidthConstraint>
    </>
  );
}
