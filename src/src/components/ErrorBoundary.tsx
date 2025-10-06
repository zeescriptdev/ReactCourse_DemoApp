import React from "react";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }
    
    componentDidCatch(error: Error) {
        console.log("Error caught:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong!</h2>
                    <div>Error: {this.state.error?.message}</div>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Reset
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;