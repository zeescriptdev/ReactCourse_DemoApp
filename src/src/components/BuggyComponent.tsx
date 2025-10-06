function BuggyComponent() {
    throw new Error("Error in Buggy Component");
    return (
        <div>
            <h3>This will never be rendered</h3>
        </div>
    )
}

export default BuggyComponent;