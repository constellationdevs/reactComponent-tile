export function handleKeyPress(event: any) {
    if (!event.target.disabled && (
        event.key === "Enter" || event.code === "Enter" ||
        event.key === " " || event.code === " ")) {
            event.preventDefault();
            event.target.click();
    }
}
