export interface WillsCloudLoginRequest {
  username : string;
  password : string;
}

export interface WillsCloudUploadRequest {
  file_name: string;
  download_link: string;
  cookies: string;
}

export class WillsCloudClient {
  async login(request : WillsCloudLoginRequest) : Promise<string> {
    const response = await fetch('https://cloud.willdengler.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw Error('Failed to log in');
    }

    return (await response.json())['token'] as string;
  }

  async upload(token: string, request: WillsCloudUploadRequest) {
    fetch('https://cloud.willdengler.com/api/v1/file_references/download_from', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }).then(response => {
      if (!response.ok) {
        console.error("Failed to upload");
        return;
      }

      console.info("Upload success!");
    });
  }
}
