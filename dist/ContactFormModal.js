"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactFormModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
function ContactFormModal({ onClose }) {
    const [isAnimatingOut, setIsAnimatingOut] = (0, react_1.useState)(false); // State to control the animation of the modal 
    const [name, setName] = (0, react_1.useState)(""); // State to store the name input
    const [email, setEmail] = (0, react_1.useState)(""); // State to store the email input
    const [message, setMessage] = (0, react_1.useState)(""); // State to store the message input
    const [mounted, setMounted] = (0, react_1.useState)(false);
    // This function handles the form submission. It sends the name, email, and message to the server.
    // If the submission is successful, it shows a success message and closes the modal.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Validate the email format
            // Contact the server to send the email
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            // Parse the response from the server
            const data = await response.json().catch(() => ({}));
            if (response.ok) {
                react_hot_toast_1.default.success("Message sent successfully!");
                onClose();
            }
            else {
                react_hot_toast_1.default.error(data.message || "Something went wrong.");
            }
        }
        catch (err) {
            console.error(err);
            react_hot_toast_1.default.error("Network error. Please try again later.");
        }
    };
    (0, react_1.useEffect)(() => {
        // Add a class to the body to prevent scrolling when the modal is open
        // This is done to prevent the background from scrolling when the modal is open
        setMounted(true);
        document.body.classList.add("overflow-hidden"); // Prevent scrolling
        return () => document.body.classList.remove("overflow-hidden"); // Remove the class when the modal is closed
    }, []);
    const close = () => {
        // Close the modal and remove the class from the body
        setIsAnimatingOut(true);
        setTimeout(onClose, 300);
    };
    const modalContent = ((0, jsx_runtime_1.jsx)("div", { 
        // This is the modal overlay. It covers the entire screen and has a semi-transparent background.
        // It also has a blur effect to make the background less distracting.
        className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm", onClick: close, children: (0, jsx_runtime_1.jsxs)("div", { 
            // This is the modal content. It contains the form and the close button.
            // It has a dark background and a border to make it stand out.
            className: `bg-[#1e1e1e] text-white border border-[#333] rounded-xl p-6 max-w-md w-full relative ${isAnimatingOut ? "animate-elastic-out" : "animate-elastic-in"}`, 
            // The className is used to apply the animation and styles to the modal.
            onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("button", { onClick: close, 
                    // It has a hover effect to make it more interactive.
                    className: "absolute top-1 right-3 text-3xl text-gray-400 hover:text-red-500", children: "\u00D7 " }), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold mb-4", children: "Contact Me" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [" ", (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, placeholder: "Your Name", className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444]", value: name, onChange: (e) => setName(e.target.value) }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, placeholder: "Your Email", className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444]", value: email, onChange: (e) => setEmail(e.target.value) }), (0, jsx_runtime_1.jsx)("textarea", { required: true, placeholder: "Your Message", className: "w-full p-2 bg-[#2a2a2a] rounded border border-[#444] h-32", value: message, onChange: (e) => setMessage(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded", children: "Send Message" })] })] }) }));
    // Only render if mounted (client-side) to avoid hydration issues
    if (!mounted)
        return null;
    // Use portal to render the modal at the document root level
    return (0, react_dom_1.createPortal)(modalContent, document.body);
}
