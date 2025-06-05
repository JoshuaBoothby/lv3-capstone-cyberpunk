import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
const TABLE = "cyberpunks";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export const scanCyberpunks = async () => {
  const command = new ScanCommand({
    TableName: "cyberpunks",
  });
  const response = await docClient.send(command);
  return response.Items;
};

export async function createCyberpunk(cyberpunk) {
  await docClient.send(
    new PutCommand({
      TableName: TABLE,
      Item: cyberpunk,
    })
  );
}

export async function deleteCyberpunk(id) {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: { id },
    })
  );
}

export async function updateCyberpunkImage(id, imageUrl) {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "set #imageUrl = :imageUrl",
      ExpressionAttributeNames: {
        "#imageUrl": "imageUrl",
      },
      ExpressionAttributeValues: {
        ":imageUrl": imageUrl,
      },
    })
  );
}

export async function toggleKIA(id, kia) {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET #kia = :kia",
      ExpressionAttributeNames: {
        "#kia": "kia",
      },
      ExpressionAttributeValues: {
        ":kia": kia,
      },
    })
  );
}

export async function updateCyberpunkNotes(id, notes) {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "set #notes = :notes",
      ExpressionAttributeNames: {
        "#notes": "notes",
      },
      ExpressionAttributeValues: {
        ":notes": notes,
      },
    })
  );
}
