// ******************************************************************************
// VARIABLES ********************************************************************
// ******************************************************************************

// ******************************************************************************
// FONCTIONS ********************************************************************
// ******************************************************************************

// vérification du mot de passe / log 
const isConnected = () => {
    const checkPwd = sessionStorage.getItem('pwd')
    !checkPwd ? window.location.href = "../index.html" : ""; 
}

// ******************************************************************************
// EVENEMENTS *******************************************************************
// ******************************************************************************
window.addEventListener('load', isConnected)




