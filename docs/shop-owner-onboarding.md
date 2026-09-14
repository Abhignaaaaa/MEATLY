
# MEATLY Shop Owner Onboarding & Admin Approval Flow

## 1. Overview
The MEATLY platform allows customers to register as Shop Owners. The onboarding flow ensures that shop registrations undergo an admin review process before the shop becomes active and visible to customers.

## 2. Shop Application Statuses
- **NONE / undefined**: Existing legacy or seeded shops (Active).
- **PENDING**: Application submitted, waiting for admin review (Inactive).
- **APPROVED**: Admin reviewed and approved. Owner dashboard access granted (Active).
- **REJECTED**: Admin rejected the application. Owner must resubmit (Inactive).

## 3. Owner Registration Flow (Frontend)
1. Customer logs in and visits their **Account** page.
2. An onboarding banner 'Own a meat shop?' directs them to the Application Status view.
3. If no application exists, they are routed to the **Register Your Shop** form (/shop-register).
4. They fill in shop, owner, location, and operational details.
5. Upon submission, the application is created as **PENDING**.
6. The user is redirected to the **Application Status** page where they see the 'Under Review' state.

## 4. Admin Approval Flow (Frontend & Backend)
1. Admins access the **Shop Applications** tab in the Admin Dashboard.
2. The table displays all applications (Pending, Approved, Rejected).
3. Clicking **Review** opens the application details page.
4. Admins can **Approve** or **Reject**:
    - **APPROVE**:
        - Updates applicationStatus to APPROVED.
        - Sets isActive = true and isOpen = true.
        - Updates the applicant's User.role to shop_owner.
    - **REJECT**:
        - Updates applicationStatus to REJECTED.
        - Records the required rejectionReason.
        - Keeps isActive = false.

## 5. Security & Authorization Rules
- Customer accounts cannot access admin endpoints.
- Customer accounts cannot access the owner dashboard (enforced by OwnerGuard and backend middleware).
- Shop owner identities (ownerId) are securely derived from JWT (req.user.userId).
- Backend strictly checks if a user already has an application to prevent duplicate spam.
- Only applications with isActive: true are returned by the Customer Shop Discovery APIs, ensuring pending/rejected applications remain hidden from public view.
- Admin review APIs require the requireAdmin middleware.

## 6. Endpoints Added
### Owner APIs (/api/owner)
- POST /applications - Submit an application.
- GET /applications/me - Fetch authenticated user's application.
- PATCH /applications/:id/resubmit - Resubmit a rejected application.

### Admin APIs (/api/admin)
- GET /shop-applications - Fetch all applications.
- GET /shop-applications/:id - Fetch details of an application.
- PATCH /shop-applications/:id/approve - Approve an application.
- PATCH /shop-applications/:id/reject - Reject an application with a reason.
