<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|string|unique:employees,employee_id,' . $this->route('employee')->id . '|max:50',
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'current_quota' => 'required|integer|min:0|max:50',
            'used_quota' => 'required|integer|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This Employee ID is already taken by another employee.',
            'name.required' => 'Employee name is required.',
            'department.required' => 'Department is required.',
            'current_quota.required' => 'Current quota is required.',
            'current_quota.min' => 'Quota cannot be negative.',
            'current_quota.max' => 'Quota cannot exceed 50 gallons.',
            'used_quota.required' => 'Used quota is required.',
            'used_quota.min' => 'Used quota cannot be negative.',
        ];
    }
}