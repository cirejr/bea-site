ALTER TABLE "catalogue_requests" 
ADD COLUMN "isRead" boolean DEFAULT false NOT NULL,
ADD COLUMN "readAt" timestamp with time zone;