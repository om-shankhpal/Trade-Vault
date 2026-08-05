import { useEffect, useState } from "react";

import {
  getProfile,
} from "../services/profile.service";

function useProfile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    setProfile,
  };
}

export default useProfile;