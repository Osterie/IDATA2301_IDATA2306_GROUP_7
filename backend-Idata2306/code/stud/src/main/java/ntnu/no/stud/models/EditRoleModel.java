package ntnu.no.stud.models;

public class EditRoleModel {

    private int id;

    private String roleName;


    public EditRoleModel() { }

    public EditRoleModel(int id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}