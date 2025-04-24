package ntnu.no.stud.models;

import java.util.List;

import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;

public class EditUsersInRoleModel {

    private List<User> users;

    private UserRole role;


    public EditUsersInRoleModel() { }

    public EditUsersInRoleModel(List<User> users, UserRole role) {
        this.users = users;
        this.role = role;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}