package edu.weber.domain;

/**
 * This models holds fields that are returned to the frontend.
 * Note: This is NOT an http response class. This is just a model.
 */
//TODO: Make this extend/implement 'responseEntity' to make it a true http response object.
public class ResponseData {

    private boolean success;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
