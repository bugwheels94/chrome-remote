import { createContainer } from "unstated-next";
import { useState } from "react";
function useSocket() {
	return useState(null);
}

export const Socket = createContainer(useSocket);
