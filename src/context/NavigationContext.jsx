"use client";

import React, {
	createContext,
	useContext,
	useState,
	useRef,
	useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
	const pathname = usePathname();
	const router = useRouter();
	const [localActiveSection, setLocalActiveSection] = useState("hero");
	const isClickScrollingRef = useRef(false);
	const clickTargetRef = useRef(null);
	const clickUnlockTimerRef = useRef(null);

	const isProjectsRoute = pathname.startsWith("/projects");
	const activeSection = isProjectsRoute ? "projects" : localActiveSection;

	const setActiveSection = useCallback((id) => {
		if (!id) {
			setLocalActiveSection("");
			return;
		}
		const raw = id || "hero";
		const normalized = raw === "cta" ? "contact" : raw;
		setLocalActiveSection(normalized);
	}, []);

	const navigateToSection = useCallback(
		(sectionId, e) => {
			if (e && e.preventDefault) {
				e.preventDefault();
			}

			const raw = sectionId || "hero";
			const targetId = raw === "cta" ? "contact" : raw;

			setLocalActiveSection(targetId);
			clickTargetRef.current = targetId;
			isClickScrollingRef.current = true;

			if (pathname === "/") {
				// Update URL hash directly without intermediate steps
				const newHash = targetId === "hero" ? "" : `#${targetId}`;
				if (typeof window !== "undefined") {
					window.history.replaceState(
						null,
						"",
						newHash ? newHash : window.location.pathname,
					);
				}

				if (clickUnlockTimerRef.current) {
					clearTimeout(clickUnlockTimerRef.current);
				}

				if (targetId === "hero") {
					window.scrollTo({ top: 0, behavior: "smooth" });
				} else {
					const el = document.getElementById(targetId);
					if (el) {
						const targetY = Math.max(
							0,
							el.getBoundingClientRect().top + window.scrollY - 80,
						);
						window.scrollTo({ top: targetY, behavior: "smooth" });
					}
				}

				const unlock = () => {
					isClickScrollingRef.current = false;
					clickTargetRef.current = null;
					window.removeEventListener("wheel", cancelOnUserAction);
					window.removeEventListener("touchmove", cancelOnUserAction);
				};

				const cancelOnUserAction = () => {
					unlock();
				};

				window.addEventListener("wheel", cancelOnUserAction, {
					passive: true,
					once: true,
				});
				window.addEventListener("touchmove", cancelOnUserAction, {
					passive: true,
					once: true,
				});

				// Safety maximum timeout: 3500ms
				clickUnlockTimerRef.current = setTimeout(unlock, 3500);
			} else {
				router.push(`/#${targetId}`);
			}
		},
		[pathname, router],
	);

	return (
		<NavigationContext.Provider
			value={{
				activeSection,
				setActiveSection,
				navigateToSection,
				isClickScrollingRef,
				clickTargetRef,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation() {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
}

export default NavigationContext;
