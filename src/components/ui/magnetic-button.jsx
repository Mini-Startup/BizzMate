"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export const MagneticButton = React.forwardRef(
  ({ className, children, href, type = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.03,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    const setRef = (node) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const combinedClassName = cn(
      "cursor-pointer select-none inline-flex items-center justify-center transition-shadow will-change-transform",
      className
    );

    if (href) {
      if (href.startsWith("mailto:")) {
        return (
          <a ref={setRef} href={href} className={combinedClassName} {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link ref={setRef} href={href} className={combinedClassName} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={setRef} type={type} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
export default MagneticButton;
