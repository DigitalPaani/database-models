
export const skillTypes = [
    {
      label: 'Electrical',
      value: 'ELECTRICAL',
    },
    {
      label: 'Plant Manager',
      value: 'PLANT_MANAGER',
    },
  ];
  export const skillLevels = [
    {
      label: "Low",
      value: "LOW",
    },
    {
      label: "Medium",
      value: "MEDIUM",
    },
    {
      label: "High",
      value: "HIGH",
    }
  ];
  
  export const createWorkflowAvailableActions = [
    {
      navbar: {
        label: 'Action',
        value: 'ACTION',
      },
      availableOptions: [
        { label: 'Assign to a different user', value: 'ASSIGN_TO_A_DIFFERENT_USER' },
        { label: 'Set field', value: 'SET_FIELD' },
        { label: 'Create Sub Task', value: 'CREATE_SUB_TASK' },
      ],
    },
    {
      navbar: {
        label: 'Communication',
        value: 'COMMUNICATION',
      },
      availableOptions: [
        { label: 'Send Whatsapp Message', value: 'SEND_WHATSAPP_MESSAGE' },
        { label: 'Send SMS', value: 'SEND_SMS' },
        { label: 'Send Email', value: 'SEND_EMAIL' },
        { label: 'Call', value: 'CALL' },
      ],
    },
    {
      navbar: {
        label: 'Validate',
        value: 'VALIDATE',
      },
      availableOptions: [
        { label: 'Validate Media', value: 'VALIDATE_MEDIA' },
        { label: 'Validate Field', value: 'VALIDATE_FIELD' },
      ],
    },
  ];
  
  export const taskCompletionEnums = [
    {
      label: "Sensor Based",
      value: "SENSOR_BASED",
    },
    {
      label: "Manual Update",
      value: "MANUAL_UPDATE",
    },
    {
      label: "Manager Approval",
      value: "MANAGER_APPROVAL",
    }
  ];
  
  export const assigneeMethodEnums = [
    {
      label: "Shift Based",
      value: "SHIFT_BASED",
    },
    {
      label: "Skills Based",
      value: "SKILLS_BASED",
    },
    {
      label: "Emergency Based",
      value: "EMERGENCY_BASED",
    },
    {
      label: "Scheduled Based",
      value: "SCHEDULED_BASED",
    },
    {
      label: "Re-Assignment",
      value: "RE_ASSIGNMENT",
    },
    {
      label: "Non Assigned task",
      value: "NON_ASSIGNED_TASK",
    },
  ]