import { render, screen } from "@testing-library/react";
import Greetings from "./Greetings";

test("renders Greetings component", () => {
    render(<Greetings />);
    const linkElement = screen.getByText(/Greetings/i);
    expect(linkElement).toBeInTheDocument();
});