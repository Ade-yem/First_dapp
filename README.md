# HealthChain: Secure Patient-Driven Decentralized Medical Record Exchange

"HealthChain" aims to revolutionize how medical records are managed and shared, placing control firmly in the hands of patients while ensuring security, privacy, and interoperability. This concept not only fosters trust between patients and healthcare providers but also paves the way for a more efficient and secure healthcare information exchange.

In developing economies, the significance of effectively managing patient medical records cannot be overstated. Currently, patients encounter the inconvenience of having to repeatedly register their medical history whenever they visit a new healthcare facility, either locally or in another location. This often results in redundant tests being conducted by new healthcare providers, leading to unnecessary expenses and delays in treatment. Furthermore, in areas lacking testing facilities, patients are forced to travel long distances to access necessary medical examinations.

HealthChain addresses this critical issue by leveraging blockchain technology to facilitate the secure and efficient sharing of medical records, subject to patient approval. With HealthChain, patients no longer need to undergo redundant tests or travel extensively to access medical laboratories or testing facilities. Through secure and user-controlled access permissions, patients can authorize or revoke access to their medical records, ensuring privacy and data security while streamlining healthcare delivery.


## Core Features

 ## Decentralized Identity Verification: 
 Patients and healthcare providers have unique blockchain-based identities. This ensures secure and verifiable interactions.

## Permissioned Record Access: 
Patients grant or revoke access to their medical records through smart contracts. Only authorized entities (as permitted by the patient) can view or update records.

 ## Immutable Audit Trail: 
 Every access or modification of a medical record is recorded on the blockchain. This provides an immutable history of who accessed what and when, enhancing transparency and trust.

## Data Encryption: 
patient medical records data are encrypted. This ensures that data privacy is maintained, even if the blockchain is public.

 ## Smart Contract for Consent Management: 
 HealthChain smart contracts are developed to  manage consents for medical record access. Only a verified hospital can add a patient or doctor, only the patient can approve a verified doctor to access or update the patient's medical record.

 ## Patient-Centric Interface: 
 A user-friendly interface for patients to easily manage access permissions, view access logs, and receive notifications for access requests.

## Healthcare Provider Portal: 
A secure portal for healthcare providers to request access to patient records, update medical data (as permitted), and view patient-consented information.

# Challenges and Considerations

- ## Scalability: 
Blockchain networks, especially those using smart contracts like Ethereum, can face scalability issues. Solutions such as layer 2 scaling solutions or alternative blockchains might be needed. Lisk L2 is the perfect match as it provides faster transaction time at a lower gas fee and is also interoperable as a superchain collective.

- ## Data Storage: 
Blockchain is not suited for storing large volumes of data like images or detailed medical records. Use off-chain storage solutions for the data itself, with blockchain managing access and integrity checks. Light.house provides the ipfs and ipns options for decentralized storage.
- ## Regulatory Compliance: 
HealthChain complies with healthcare regulations and data protection laws (like HIPAA in the US or GDPR in Europe). This includes considerations for data encryption, patient consent, and data portability.

- ## Interoperability Standards: 
HealthChain is compatible with existing healthcare data standards (like HL7, FHIR) for easier integration with current systems.

## Prototype Development

1. ## Smart Contract Development: 
A Solidity smart contract developed with hardhat tool was developed to handle identity verification, access permissions, and the audit trail of record access.

2. ## Blockchain Network: 
Lisk L2 blockchain  for lower transaction costs, speed, interoperability and security.

3. ## Frontend Application: 
Develop a patient and healthcare provider interface using Nextjs and integrate with blockchain using libraries like  ethers.js.

## Demo
[Visit HealthChain](https://healthchain-v1.vercel.app/)

[Smart Contract repo](https://github.com/Etette/healthchain/tree/master/Healthchain%20Smart%20Contract)

Smart contract address -- 0xd5DAE25D2707f17278716299d0cE7fF28A3FAbA3
