const { PublicClientApplication } = require('@azure/msal-node');

const config = {
    auth: {
        clientId: process.env.ARUE_CLIENT_FOR_OUTLOOK_ID,  // ← Paste your ARUE_CLIENT_FOR_OUTLOOK_ID here
        // authority: 'https://login.microsoftonline.com/common',  // 'common' for personal accounts
        authority: 'https://login.microsoftonline.com/consumers',
        redirectUri: 'http://localhost'  // optional
    }
};

const pca = new PublicClientApplication(config);

const scopes = [
    'https://graph.microsoft.com/Mail.Send',
    'offline_access',
    'openid',
    'profile'
];

export async function GetAzureToken() {
    try {
        console.log('Requesting device code...');
        const deviceCodeResponse = await pca.acquireTokenByDeviceCode({
            deviceCodeCallback: (response: any) => {
                console.log('\n=== Go to this URL in your browser ===');
                console.log(response.verificationUri);
                console.log('Enter this code:');
                console.log(response.userCode);
                console.log('\nIt expires in:', response.expiresIn, 'seconds');
                console.log('Sign in with your Outlook email: outlook_D3CDCDDB3A7D7C46@outlook.com');
            },
            scopes: scopes
        });

        console.log('\nSuccess! Access Token:');
        console.log(deviceCodeResponse.accessToken);
        console.log('\nRefresh Token (save this forever!):');
        console.log(deviceCodeResponse.refreshToken);
        console.log('\nNow you can use these in Nodemailer.');
    } catch (error) {
        console.error('Error:', error);
    }
}


