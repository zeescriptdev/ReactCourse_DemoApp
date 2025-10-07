import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("renders Counter component", () => {
    render(<Counter />);
    const linkElement = screen.getByText(/Count : 0/i);
    expect(linkElement).toBeInTheDocument();
});

test("increments count when button is clicked", () => {
    render(<Counter />);
    const button = screen.getByText(/Increment/i);
    fireEvent.click(button);
    const linkElement = screen.getByText(/Count : 1/i);
    expect(linkElement).toHaveTextContent(/Count : 1/i);
});