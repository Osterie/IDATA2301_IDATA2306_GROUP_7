import SettingsMenu from "../components/settings/SettingsMenu"

function ProfilePage(user) {

  return (
    <>
        <SettingsMenu user={user} />
    </>
  );
}

export default ProfilePage;