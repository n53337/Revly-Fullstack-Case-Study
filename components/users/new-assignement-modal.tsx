import { assignVendor } from "@/queries/user.queries";
import { getVendors } from "@/queries/vendor.queries";
import { Input, Modal, Select, Switch } from "antd";
import { useState } from "react";

export default function NewAssignementModal({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: number;
}) {
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const { data: vendors } = getVendors(1, 10);
  const { mutateAsync: assignVendorsMutation, isPending } = assignVendor();
  const [error, setError] = useState("");

  const validateAndAssign = async () => {
    if (selectedVendor === null) {
      setError("Please select a vendor");
      return;
    }
    if (displayName.length === 0) {
      setError("Please enter a display name");
      return;
    }

    await assignVendorsMutation({
      id: userId,
      vendorId: selectedVendor,
      display_name: displayName,
      is_enabled: isEnabled,
    });

    onClose();
  };

  return (
    <Modal
      title="New Assignement"
      open={open}
      onCancel={onClose}
      onOk={validateAndAssign}
      okButtonProps={{
        disabled: error !== "",
        loading: isPending,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">
            Select a vendor to assign to the user
          </label>
          <Select
            options={vendors?.data.map((vendor) => ({
              label: vendor.name,
              value: vendor.id,
            }))}
            value={selectedVendor}
            onChange={(value) => setSelectedVendor(value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">Display name</label>
          <Input
            placeholder="Display name for the relation"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">Status</label>
          <div className="flex items-center gap-2">
            <Switch
              className="w-fit"
              checked={isEnabled}
              onChange={(checked) => setIsEnabled(checked)}
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
