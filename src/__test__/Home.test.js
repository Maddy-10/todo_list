import { render, screen } from "@testing-library/react";
import Home from "../page/Home";

test("Check Page is Loaded", () => {
    render(<Home />);
    expect(screen.getByText(/To-Do List/)).toBeInTheDocument;
});

test("Check Search bar has empty value", () => {
    render(<Home />);
    const searchEle = screen.getByPlaceholderText("Search tasks...");
    expect(searchEle).toBeInTheDocument;
    expect(searchEle.value).toBe("");
});

test("Check Input Task has empty value", () => {
    render(<Home />);
    const searchEle = screen.getByPlaceholderText("Enter Task...");
    expect(searchEle).toBeInTheDocument;
    expect(searchEle.value).toBe("");
});


