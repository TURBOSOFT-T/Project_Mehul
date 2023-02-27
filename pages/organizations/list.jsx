
 
export  const  ListRow = ({ organization, deleteOrganization }) => {

    return (
        <tr key={organization.id}>
        <td></td>
        <td>{organization.name}</td>
        <td>{organization.email}</td>
        <td>{organization.phones}</td>
    
        <td></td>
    
         <td>
            <Link
            href={`/organization/${organization.id}`}
            className="btn btn-sm btn-primary"
            >
            Edit
            </Link>
            <Button
            variant="danger"
            size="sm"
            onClick={() => deleteOrganization.mutate(organization.id)}
            >
            Delete
            </Button>
        </td>  
        </tr>
    );
    };
