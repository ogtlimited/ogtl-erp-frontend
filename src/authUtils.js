//* IN USE

// Fetch user's groups from Microsoft Graph
export const fetchMsGraph = async (accessToken) => {
  const response = await fetch("https://graph.microsoft.com/v1.0/me/memberOf", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user groups from Microsoft Graph");
  }

  const data = await response.json();
  const groups = data.value.map((group) => group.id);

  console.log("group data:", data?.value);
  console.log("groups", groups);

  return { groups };
};

// Check if interaction is required for login (e.g., login required for the first time)
export const requiresInteraction = (errorMessage) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") !== -1 ||
    errorMessage.indexOf("interaction_required") !== -1 ||
    errorMessage.indexOf("login_required") !== -1
  );
};

// Check if the browser is Internet Explorer
export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const trident = ua.indexOf("Trident/");
  return msie > 0 || trident > 0;
};
