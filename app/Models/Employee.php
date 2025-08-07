<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $employee_id
 * @property string $name
 * @property string $department
 * @property int $current_quota
 * @property int $used_quota
 * @property \Illuminate\Support\Carbon $quota_reset_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GallonTransaction> $transactions
 * @property-read int|null $transactions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCurrentQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUsedQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereQuotaResetDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'name',
        'department',
        'current_quota',
        'used_quota',
        'quota_reset_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'current_quota' => 'integer',
        'used_quota' => 'integer',
        'quota_reset_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all transactions for this employee.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(GallonTransaction::class);
    }

    /**
     * Check if employee needs quota reset for current month.
     *
     * @return bool
     */
    public function needsQuotaReset(): bool
    {
        return $this->quota_reset_date->format('Y-m') !== now()->format('Y-m');
    }

    /**
     * Reset monthly quota.
     *
     * @return void
     */
    public function resetMonthlyQuota(): void
    {
        $this->update([
            'used_quota' => 0,
            'current_quota' => 10,
            'quota_reset_date' => now()->startOfMonth(),
        ]);
    }

    /**
     * Get remaining quota.
     *
     * @return int
     */
    public function getRemainingQuotaAttribute(): int
    {
        return $this->current_quota - $this->used_quota;
    }

    /**
     * Check if employee can take specified gallons.
     *
     * @param int $gallons
     * @return bool
     */
    public function canTakeGallons(int $gallons): bool
    {
        return $this->getRemainingQuotaAttribute() >= $gallons;
    }
}