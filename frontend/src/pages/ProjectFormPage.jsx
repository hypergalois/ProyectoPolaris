import { ProjectsProvider } from "../context/ProjectsContext";
import ProjectForm from "../components/ProjectForm";

const ProjectFormPage = () => {
    return (
        <div>
            <h1>Project Form Page</h1>
            <ProjectsProvider>
                <ProjectForm />
            </ ProjectsProvider>
        </div>
    )
}

export default ProjectFormPage;